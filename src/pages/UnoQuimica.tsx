import { useState, useEffect, useCallback, useRef } from "react";

// ============================================================
// CONSTANTS & DATA
// ============================================================

const VALENCE_COLORS = {
    "-3": "#7C3AED",
    "-2": "#2563EB",
    "-1": "#0891B2",
    "+1": "#16A34A",
    "+2": "#D97706",
    "+3": "#EA580C",
    "+4": "#DC2626",
    "+5": "#9D174D",
    "+6": "#6D28D9",
    "+7": "#B45309",
};

const VALENCE_ORDER = ["-3", "-2", "-1", "+1", "+2", "+3", "+4", "+5", "+6", "+7"];

function getValenceColor(v) {
    return VALENCE_COLORS[v] || "#6B7280";
}

const ELEMENTS = [
    { symbol: "H", name: "Hidrógeno", valences: ["+1", "-1"] },
    { symbol: "Li", name: "Litio", valences: ["+1"] },
    { symbol: "Na", name: "Sodio", valences: ["+1"] },
    { symbol: "K", name: "Potasio", valences: ["+1"] },
    { symbol: "Rb", name: "Rubidio", valences: ["+1"] },
    { symbol: "Mg", name: "Magnesio", valences: ["+2"] },
    { symbol: "Ca", name: "Calcio", valences: ["+2"] },
    { symbol: "Ba", name: "Bario", valences: ["+2"] },
    { symbol: "Al", name: "Aluminio", valences: ["+3"] },
    { symbol: "Ga", name: "Galio", valences: ["+3"] },
    { symbol: "C", name: "Carbono", valences: ["+2", "+4", "-4"] },
    { symbol: "Si", name: "Silicio", valences: ["+4", "-4"] },
    { symbol: "Ge", name: "Germanio", valences: ["+2", "+4"] },
    { symbol: "N", name: "Nitrógeno", valences: ["-3", "+1", "+2", "+3", "+4", "+5"] },
    { symbol: "P", name: "Fósforo", valences: ["-3", "+3", "+5"] },
    { symbol: "As", name: "Arsénico", valences: ["-3", "+3", "+5"] },
    { symbol: "O", name: "Oxígeno", valences: ["-2", "-1"] },
    { symbol: "S", name: "Azufre", valences: ["-2", "+4", "+6"] },
    { symbol: "Se", name: "Selenio", valences: ["-2", "+4", "+6"] },
    { symbol: "Cl", name: "Cloro", valences: ["-1", "+1", "+3", "+5", "+7"] },
    { symbol: "Br", name: "Bromo", valences: ["-1", "+1", "+3", "+5"] },
    { symbol: "I", name: "Yodo", valences: ["-1", "+1", "+3", "+5", "+7"] },
    { symbol: "Fe", name: "Hierro", valences: ["+2", "+3"] },
    { symbol: "Cu", name: "Cobre", valences: ["+1", "+2"] },
    { symbol: "Zn", name: "Zinc", valences: ["+2"] },
    { symbol: "Mn", name: "Manganeso", valences: ["+2", "+4", "+7"] },
    { symbol: "Cr", name: "Cromo", valences: ["+2", "+3", "+6"] },
    { symbol: "Co", name: "Cobalto", valences: ["+2", "+3"] },
    { symbol: "Ni", name: "Níquel", valences: ["+2", "+3"] },
    { symbol: "Pb", name: "Plomo", valences: ["+2", "+4"] },
    { symbol: "Sn", name: "Estaño", valences: ["+2", "+4"] },
    { symbol: "Ag", name: "Plata", valences: ["+1"] },
    { symbol: "Au", name: "Oro", valences: ["+1", "+3"] },
    { symbol: "Pt", name: "Platino", valences: ["+2", "+4"] },
    { symbol: "Ti", name: "Titanio", valences: ["+2", "+3", "+4"] },
    { symbol: "V", name: "Vanadio", valences: ["+2", "+3", "+4", "+5"] },
    { symbol: "W", name: "Tungsteno", valences: ["+4", "+6"] },
    { symbol: "Bi", name: "Bismuto", valences: ["+3", "+5"] },
    { symbol: "Hg", name: "Mercurio", valences: ["+1", "+2"] },
    { symbol: "Cd", name: "Cadmio", valences: ["+2"] },
];

function buildDeck() {
    const cards = [];
    let id = 0;
    for (const el of ELEMENTS) {
        for (let copy = 0; copy < 2; copy++) {
            cards.push({ id: id++, type: "element", ...el });
        }
    }
    const specials = ["reverse", "skip", "draw2", "wild", "wild4"];
    for (const sp of specials) {
        for (let i = 0; i < 4; i++) {
            cards.push({ id: id++, type: "special", special: sp, symbol: specialLabel(sp), name: specialName(sp), valences: [] });
        }
    }
    return shuffle(cards);
}

function specialLabel(sp) {
    return { reverse: "↺", skip: "⊘", draw2: "+2", wild: "★", wild4: "★+4" }[sp] || sp;
}
function specialName(sp) {
    return { reverse: "Reversa", skip: "Salto", draw2: "+2 Cartas", wild: "Comodín", wild4: "Comodín +4" }[sp] || sp;
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ============================================================
// GAME LOGIC
// ============================================================

function canPlay(card, activeValence) {
    if (!card) return false;
    if (card.type === "special") return true;
    return card.valences.includes(activeValence);
}

function createInitialState(numPCs) {
    const deck = buildDeck();
    const players = [];
    const totalPlayers = 1 + numPCs;
    let deckIdx = 0;
    for (let i = 0; i < totalPlayers; i++) {
        const hand = deck.slice(deckIdx, deckIdx + 7);
        deckIdx += 7;
        players.push({ id: i, name: i === 0 ? "Tú" : `PC ${i}`, isHuman: i === 0, hand });
    }
    let firstCard = null;
    while (deckIdx < deck.length) {
        if (deck[deckIdx].type === "element") { firstCard = deck[deckIdx++]; break; }
        deckIdx++;
    }
    if (!firstCard) firstCard = deck[deckIdx++];
    const remaining = deck.slice(deckIdx);
    return {
        players,
        deck: remaining,
        discardPile: [firstCard],
        activeValence: firstCard.valences ? firstCard.valences[0] : "+1",
        currentPlayer: 0,
        direction: 1,
        phase: "playing",
        pendingCard: null,
        winner: null,
        log: [`Juego iniciado. Valencia activa: ${firstCard.valences ? firstCard.valences[0] : "+1"}`],
        drawnCardId: null, // id of card just drawn by human — stays in hand until played or passed
        turnCount: 0,
    };
}

function nextPlayerIdx(state, skip = false) {
    const n = state.players.length;
    let next = (state.currentPlayer + state.direction + n) % n;
    if (skip) next = (next + state.direction + n) % n;
    return next;
}

function applyPlayCard(state, cardId, chosenValence = null) {
    const player = state.players[state.currentPlayer];
    const cardIdx = player.hand.findIndex(c => c.id === cardId);
    if (cardIdx === -1) return state;
    const card = player.hand[cardIdx];

    const newHand = player.hand.filter(c => c.id !== cardId);
    const newPlayers = state.players.map((p, i) =>
        i === state.currentPlayer ? { ...p, hand: newHand } : p
    );

    if (newHand.length === 0) {
        return {
            ...state, players: newPlayers, phase: "gameOver", winner: state.currentPlayer,
            discardPile: [card, ...state.discardPile], drawnCardId: null,
            log: [...state.log, `¡${player.name} gana el juego! 🏆`]
        };
    }

    let newState = {
        ...state, players: newPlayers,
        discardPile: [card, ...state.discardPile],
        drawnCardId: null,
        log: [...state.log, `${player.name} jugó ${card.symbol || card.special}`],
    };

    if (card.type === "special") {
        switch (card.special) {
            case "reverse":
                newState.direction *= -1;
                newState.log = [...newState.log, "¡Sentido invertido!"];
                newState.currentPlayer = nextPlayerIdx(newState);
                break;
            case "skip": {
                const skipped = nextPlayerIdx(newState);
                newState.log = [...newState.log, `${newState.players[skipped].name} pierde turno.`];
                newState.currentPlayer = nextPlayerIdx(newState, true);
                break;
            }
            case "draw2": {
                const target = nextPlayerIdx(newState);
                newState = giveCards(newState, target, 2);
                newState.log = [...newState.log, `${newState.players[target].name} roba 2 cartas y pierde turno.`];
                newState.currentPlayer = nextPlayerIdx(newState, true);
                break;
            }
            case "wild":
                if (chosenValence) {
                    newState.activeValence = chosenValence;
                    newState.log = [...newState.log, `Comodín → Valencia: ${chosenValence}`];
                    newState.currentPlayer = nextPlayerIdx(newState);
                } else {
                    return { ...state, phase: "selectValence", pendingCard: card, players: newPlayers, discardPile: [card, ...state.discardPile], drawnCardId: null };
                }
                break;
            case "wild4": {
                if (chosenValence) {
                    const target = nextPlayerIdx(newState);
                    newState = giveCards(newState, target, 4);
                    newState.activeValence = chosenValence;
                    newState.log = [...newState.log, `Comodín +4 → ${newState.players[target].name} roba 4. Valencia: ${chosenValence}`];
                    newState.currentPlayer = nextPlayerIdx(newState, true);
                } else {
                    return { ...state, phase: "selectValence", pendingCard: card, players: newPlayers, discardPile: [card, ...state.discardPile], drawnCardId: null };
                }
                break;
            }
        }
    } else {
        const newValence = chosenValence || card.valences[0];
        newState.activeValence = newValence;
        if (card.valences.length > 1 && !chosenValence) {
            return { ...state, phase: "selectValence", pendingCard: card, players: newPlayers, discardPile: [card, ...state.discardPile], drawnCardId: null };
        }
        newState.currentPlayer = nextPlayerIdx(newState);
    }

    newState.turnCount = (newState.turnCount || 0) + 1;
    return newState;
}

function giveCards(state, playerIdx, count) {
    let deck = [...state.deck];
    let discard = [...state.discardPile];
    if (deck.length < count) {
        const top = discard[0];
        const reshuffled = shuffle(discard.slice(1));
        deck = [...deck, ...reshuffled];
        discard = [top];
    }
    const drawn = deck.slice(0, count);
    const newDeck = deck.slice(count);
    const newPlayers = state.players.map((p, i) =>
        i === playerIdx ? { ...p, hand: [...p.hand, ...drawn] } : p
    );
    return { ...state, deck: newDeck, discardPile: discard, players: newPlayers };
}

// For AI: draws and auto-plays if possible
function applyDrawAI(state) {
    const player = state.players[state.currentPlayer];
    let newState = giveCards(state, state.currentPlayer, 1);
    const drawnCard = newState.players[state.currentPlayer].hand[newState.players[state.currentPlayer].hand.length - 1];
    newState.log = [...newState.log, `${player.name} robó una carta.`];
    if (drawnCard && canPlay(drawnCard, state.activeValence)) {
        newState.log = [...newState.log, `${player.name} jugó la carta robada: ${drawnCard.symbol}`];
        return applyPlayCard(newState, drawnCard.id);
    }
    newState.currentPlayer = nextPlayerIdx(newState);
    return newState;
}

// For human: draws card and keeps it in hand (drawnCardId is set)
function applyDrawHuman(state) {
    const player = state.players[state.currentPlayer];
    let newState = giveCards(state, state.currentPlayer, 1);
    const drawnCard = newState.players[state.currentPlayer].hand[newState.players[state.currentPlayer].hand.length - 1];
    newState.log = [...newState.log, `${player.name} robó ${drawnCard?.symbol || "una carta"}.`];
    newState.drawnCardId = drawnCard?.id || null;
    // Do NOT advance turn — human must decide: play drawn card or pass
    return newState;
}

// Human passes turn after drawing (didn't play)
function applyPassTurn(state) {
    return {
        ...state, drawnCardId: null, currentPlayer: nextPlayerIdx(state), turnCount: (state.turnCount || 0) + 1,
        log: [...state.log, "Tú pasas el turno."]
    };
}

// ============================================================
// AI LOGIC
// ============================================================

function aiChooseCard(hand, activeValence) {
    const valid = hand.filter(c => canPlay(c, activeValence));
    if (valid.length === 0) return null;
    const nonWild = valid.filter(c => c.type !== "special" || (c.special !== "wild" && c.special !== "wild4"));
    const pool = nonWild.length > 0 ? nonWild : valid;
    return pool[Math.floor(Math.random() * pool.length)];
}

function aiChooseValence(hand, card) {
    const valences = card.type === "element" ? card.valences : VALENCE_ORDER;
    const freq = {};
    for (const c of hand) {
        for (const v of (c.valences || [])) {
            freq[v] = (freq[v] || 0) + 1;
        }
    }
    let best = valences[0];
    let bestCount = 0;
    for (const v of valences) {
        if ((freq[v] || 0) >= bestCount) { bestCount = freq[v] || 0; best = v; }
    }
    return best;
}

// ============================================================
// CARD GRADIENT STYLE
// ============================================================

function CardGradientStyle(valences) {
    if (!valences || valences.length === 0) return {};
    if (valences.length === 1) return { background: getValenceColor(valences[0]) };
    const pct = 100 / valences.length;
    const stops = valences.map((v, i) => {
        const from = Math.round(i * pct);
        const to = Math.round((i + 1) * pct);
        return `${getValenceColor(v)} ${from}%, ${getValenceColor(v)} ${to}%`;
    });
    return { background: `linear-gradient(135deg, ${stops.join(", ")})` };
}

// ============================================================
// CHEMCARD COMPONENT
// ============================================================

function ChemCard({ card, onClick, selected, small, disabled, faceDown, glowing }: any) {
    if (faceDown) {
        return (
            <div onClick={disabled ? undefined : onClick} style={{
                width: small ? 44 : 70, height: small ? 64 : 100,
                borderRadius: 9,
                background: "linear-gradient(135deg, #1e3a5f 0%, #0d1f35 100%)",
                border: "2px solid rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: disabled ? "default" : "pointer",
                flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}>
                <span style={{ fontSize: small ? 16 : 24, opacity: 0.35 }}>⚗</span>
            </div>
        );
    }

    const isWild = card.type === "special" && (card.special === "wild" || card.special === "wild4");
    const bgStyle = isWild
        ? { background: "linear-gradient(135deg, #7C3AED, #2563EB, #16A34A, #D97706, #DC2626)" }
        : card.type === "special"
            ? { background: "#374151" }
            : CardGradientStyle(card.valences);

    const w = small ? 44 : 70;
    const h = small ? 64 : 100;

    return (
        <div onClick={disabled ? undefined : onClick} style={{
            width: w, height: h, borderRadius: 9,
            ...bgStyle,
            border: selected ? "3px solid #FFF" : glowing ? "2px solid #22c55e" : "2px solid rgba(255,255,255,0.18)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            cursor: disabled ? "default" : "pointer",
            flexShrink: 0,
            boxShadow: selected
                ? "0 0 0 2px #FFF, 0 4px 16px rgba(0,0,0,0.5)"
                : glowing
                    ? "0 0 14px rgba(34,197,94,0.6), 0 2px 8px rgba(0,0,0,0.4)"
                    : "0 2px 8px rgba(0,0,0,0.4)",
            transform: selected ? "translateY(-10px)" : "none",
            transition: "transform 0.15s, box-shadow 0.15s",
            position: "relative", overflow: "hidden",
            opacity: disabled && !glowing ? 0.4 : 1,
        }}>
            <div style={{ position: "absolute", inset: 4, border: "2px solid rgba(255,255,255,0.2)", borderRadius: 5 }} />
            <span style={{
                color: "#fff", fontWeight: 800, fontSize: small ? 12 : 19,
                textShadow: "0 1px 3px rgba(0,0,0,0.6)", lineHeight: 1, letterSpacing: -0.5,
            }}>{card.symbol}</span>
            {!small && (
                <span style={{
                    color: "rgba(255,255,255,0.82)", fontSize: 7,
                    marginTop: 2, textAlign: "center", maxWidth: 60,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                }}>{card.name}</span>
            )}
            {!small && card.valences && card.valences.length > 0 && (
                <div style={{ display: "flex", gap: 2, marginTop: 3, flexWrap: "wrap", justifyContent: "center", maxWidth: 58 }}>
                    {card.valences.map(v => (
                        <span key={v} style={{
                            background: "rgba(0,0,0,0.35)", color: "#fff",
                            fontSize: 6.5, borderRadius: 3, padding: "1px 3px", fontWeight: 700,
                        }}>{v}</span>
                    ))}
                </div>
            )}
        </div>
    );
}

// ============================================================
// OPPONENT PANEL — all cards horizontal, left to right
// ============================================================

function OpponentPanel({ player, isActive }) {
    return (
        <div style={{
            background: isActive ? "rgba(167,139,250,0.13)" : "rgba(255,255,255,0.04)",
            border: isActive ? "1.5px solid rgba(167,139,250,0.5)" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12, padding: "7px 12px",
            transition: "all 0.2s",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
        }}>
            <div style={{
                fontSize: 12, fontWeight: 700,
                color: isActive ? "#a78bfa" : "#9ca3af",
                display: "flex", alignItems: "center", gap: 5,
            }}>
                {isActive && <span style={{ fontSize: 8, color: "#a78bfa" }}>⬤</span>}
                {player.name}
                {player.hand.length === 1 && (
                    <span style={{ color: "#fbbf24", fontSize: 11, fontWeight: 800 }}>UNO!</span>
                )}
            </div>
            {/* Cards always in a horizontal row */}
            <div style={{
                display: "flex", flexDirection: "row", flexWrap: "nowrap",
                gap: 3, overflowX: "auto", maxWidth: "100%",
                paddingBottom: 2,
            }}>
                {player.hand.map(c => (
                    <ChemCard key={c.id} card={c} faceDown small disabled />
                ))}
            </div>
            <div style={{ fontSize: 10, color: "#6b7280" }}>
                {player.hand.length} carta{player.hand.length !== 1 ? "s" : ""}
            </div>
        </div>
    );
}

// ============================================================
// CARD PREVIEW PANEL (right side)
// ============================================================

function CardPreview({ card, activeValence, onPlay, isHumanTurn, isDrawnCard }) {
    if (!card) {
        return (
            <div style={{
                width: "100%",
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.08)",
                borderRadius: 14, padding: 16,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 8, color: "#374151", fontSize: 11, textAlign: "center", flex: 1,
            }}>
                <span style={{ fontSize: 26, opacity: 0.25 }}>🔍</span>
                <span style={{ color: "#4b5563" }}>Pasa el cursor sobre una carta</span>
            </div>
        );
    }

    const playable = canPlay(card, activeValence);
    const isWild = card.type === "special" && (card.special === "wild" || card.special === "wild4");
    const bgStyle = isWild
        ? { background: "linear-gradient(135deg, #7C3AED, #2563EB, #16A34A, #D97706, #DC2626)" }
        : card.type === "special"
            ? { background: "#374151" }
            : CardGradientStyle(card.valences);

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, letterSpacing: 1 }}>
                {isDrawnCard ? "CARTA ROBADA" : "VISTA PREVIA"}
            </div>

            {/* Large card */}
            <div style={{
                width: 100, height: 144, borderRadius: 14,
                ...bgStyle,
                border: playable ? "3px solid #22c55e" : "2px solid rgba(255,255,255,0.12)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
                boxShadow: playable
                    ? "0 0 22px rgba(34,197,94,0.45), 0 4px 20px rgba(0,0,0,0.5)"
                    : "0 4px 20px rgba(0,0,0,0.5)",
                flexShrink: 0,
            }}>
                <div style={{ position: "absolute", inset: 6, border: "2px solid rgba(255,255,255,0.18)", borderRadius: 9 }} />
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 32, textShadow: "0 2px 6px rgba(0,0,0,0.6)", lineHeight: 1 }}>
                    {card.symbol}
                </span>
                <span style={{ color: "rgba(255,255,255,0.82)", fontSize: 10, marginTop: 4, textAlign: "center", paddingInline: 8 }}>
                    {card.name}
                </span>
                {card.valences && card.valences.length > 0 && (
                    <div style={{ display: "flex", gap: 3, marginTop: 6, flexWrap: "wrap", justifyContent: "center", maxWidth: 84 }}>
                        {card.valences.map(v => (
                            <span key={v} style={{
                                background: getValenceColor(v), color: "#fff",
                                fontSize: 9, borderRadius: 4, padding: "2px 5px", fontWeight: 700,
                            }}>{v}</span>
                        ))}
                    </div>
                )}
            </div>

            {isHumanTurn && (
                <div style={{ fontSize: 11, fontWeight: 700, color: playable ? "#22c55e" : "#ef4444" }}>
                    {playable ? "✓ Jugable" : "✗ No válida"}
                </div>
            )}

            {isHumanTurn && playable && (
                <button onClick={onPlay} style={{
                    width: "90%", padding: "7px 0", borderRadius: 8, border: "none",
                    background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                    color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(124,58,237,0.4)",
                }}>
                    Jugar {card.symbol}
                </button>
            )}
        </div>
    );
}

// ============================================================
// SCREENS
// ============================================================

function MenuScreen({ onStart }) {
    const [numPCs, setNumPCs] = useState(1);
    const [showRules, setShowRules] = useState(false);

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(160deg, #0d1117 0%, #0f2027 50%, #1a0533 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#fff",
        }}>
            <div style={{ textAlign: "center", maxWidth: 440, width: "100%", padding: "0 20px" }}>
                <div style={{
                    fontSize: 64, fontWeight: 900, letterSpacing: -3,
                    background: "linear-gradient(135deg, #a78bfa, #60a5fa, #34d399, #fbbf24)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    marginBottom: 4, lineHeight: 1,
                }}>UNO</div>
                <div style={{ fontSize: 22, fontWeight: 600, color: "#c4b5fd", letterSpacing: 6, textTransform: "uppercase", marginBottom: 4 }}>
                    Químico
                </div>
                <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 40 }}>Valencias · Elementos · Estrategia</div>

                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 40 }}>
                    {[
                        { symbol: "Fe", name: "Hierro", valences: ["+2", "+3"], type: "element" },
                        { symbol: "Cl", name: "Cloro", valences: ["-1", "+1", "+3", "+5", "+7"], type: "element" },
                        { symbol: "Na", name: "Sodio", valences: ["+1"], type: "element" },
                        { symbol: "★", name: "Comodín", valences: [], type: "special", special: "wild" },
                    ].map((c, i) => <ChemCard key={i} card={c} disabled />)}
                </div>

                <div style={{ marginBottom: 24 }}>
                    <div style={{ color: "#d1d5db", fontSize: 14, marginBottom: 12 }}>Oponentes controlados por la PC</div>
                    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                        {[1, 2, 3].map(n => (
                            <button key={n} onClick={() => setNumPCs(n)} style={{
                                width: 64, height: 64, borderRadius: 12,
                                border: numPCs === n ? "2px solid #a78bfa" : "2px solid rgba(255,255,255,0.1)",
                                background: numPCs === n ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.05)",
                                color: numPCs === n ? "#a78bfa" : "#9ca3af",
                                fontSize: 22, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                            }}>{n}</button>
                        ))}
                    </div>
                    <div style={{ color: "#6b7280", fontSize: 12, marginTop: 8 }}>Total: {1 + numPCs} jugadores</div>
                </div>

                <button onClick={() => onStart(numPCs)} style={{
                    width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
                    background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                    color: "#fff", fontSize: 18, fontWeight: 700, cursor: "pointer", marginBottom: 12, letterSpacing: 1,
                }}>¡Jugar ahora!</button>

                <button onClick={() => setShowRules(r => !r)} style={{
                    background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                    color: "#9ca3af", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontSize: 14,
                }}>{showRules ? "Ocultar reglas" : "Ver reglas"}</button>

                {showRules && (
                    <div style={{
                        marginTop: 20, padding: 20, borderRadius: 12,
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        textAlign: "left", color: "#d1d5db", fontSize: 13, lineHeight: 1.7,
                    }}>
                        <strong style={{ color: "#a78bfa" }}>Mecánica básica:</strong><br />
                        Cada carta tiene una o más valencias. Solo puedes jugar una carta si comparte la <strong>valencia activa</strong>.<br /><br />
                        <strong style={{ color: "#a78bfa" }}>Al robar:</strong><br />
                        La carta llega a tu mano. Si es jugable (borde verde), puedes jugarla o pasar el turno.<br /><br />
                        <strong style={{ color: "#a78bfa" }}>Cartas especiales:</strong><br />
                        ↺ Reversa · ⊘ Salto · +2 · ★ Comodín · ★+4
                    </div>
                )}
            </div>
        </div>
    );
}

function GameOverScreen({ winner, players, turnCount, onRestart }) {
    const winPlayer = players[winner];
    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(160deg, #0d1117, #0f2027, #1a0533)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#fff",
        }}>
            <div style={{ textAlign: "center", maxWidth: 400, padding: "0 20px" }}>
                <div style={{ fontSize: 72, marginBottom: 16 }}>🏆</div>
                <div style={{
                    fontSize: 32, fontWeight: 800,
                    background: "linear-gradient(135deg,#fbbf24,#f59e0b)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8,
                }}>¡{winPlayer.name} gana!</div>
                <div style={{ color: "#9ca3af", fontSize: 15, marginBottom: 32 }}>
                    Partida terminada en {turnCount} turnos
                </div>
                <div style={{
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12, padding: 20, marginBottom: 28,
                }}>
                    <div style={{ color: "#d1d5db", fontSize: 13, marginBottom: 12 }}>Cartas restantes</div>
                    {players.map((p, i) => (
                        <div key={i} style={{
                            display: "flex", justifyContent: "space-between", padding: "6px 0",
                            borderBottom: i < players.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                            color: i === winner ? "#a78bfa" : "#9ca3af",
                        }}>
                            <span style={{ fontWeight: i === winner ? 700 : 400 }}>{p.name}</span>
                            <span>{p.hand.length} cartas</span>
                        </div>
                    ))}
                </div>
                <button onClick={onRestart} style={{
                    width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
                    background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                    color: "#fff", fontSize: 18, fontWeight: 700, cursor: "pointer",
                }}>Jugar de nuevo</button>
            </div>
        </div>
    );
}

function ValenceModal({ card, onSelect }) {
    const valences = card.type === "element" ? card.valences : VALENCE_ORDER;
    return (
        <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.78)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
            <div style={{
                background: "#1f2937", borderRadius: 16, padding: 28,
                maxWidth: 360, width: "90%", border: "1px solid rgba(255,255,255,0.1)",
            }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
                    Elige la nueva valencia activa
                </div>
                <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 20 }}>
                    Carta jugada: <strong style={{ color: "#d1d5db" }}>{card.symbol} — {card.name}</strong>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                    {valences.map(v => (
                        <button key={v} onClick={() => onSelect(v)} style={{
                            padding: "10px 18px", borderRadius: 10,
                            border: "2px solid rgba(255,255,255,0.15)",
                            background: getValenceColor(v), color: "#fff",
                            fontSize: 16, fontWeight: 700, cursor: "pointer", minWidth: 56,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        }}>{v}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================================
// AI TIMER BAR
// ============================================================

function AiTimerBar({ active, duration }) {
    const [width, setWidth] = useState(100);
    useEffect(() => {
        if (!active) { setWidth(100); return; }
        setWidth(100);
        const start = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const pct = Math.max(0, 100 - (elapsed / duration) * 100);
            setWidth(pct);
            if (pct <= 0) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
    }, [active, duration]);

    if (!active) return null;
    return (
        <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
            background: "rgba(255,255,255,0.07)",
        }}>
            <div style={{
                height: "100%", width: `${width}%`,
                background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                transition: "width 0.03s linear",
            }} />
        </div>
    );
}

// ============================================================
// MAIN GAME BOARD
// ============================================================

const AI_DELAY = 1400; // ms between AI moves

function GameBoard({ numPCs, onGoToMenu }) {
    const [state, setState] = useState(() => createInitialState(numPCs));
    const [selectedCard, setSelectedCard] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [aiThinking, setAiThinking] = useState(false);
    const aiTimerRef = useRef(null);
    const logRef = useRef(null);

    const isHumanTurn = state.phase === "playing" && state.players[state.currentPlayer]?.isHuman;
    const hasDrawn = !!state.drawnCardId; // human drew a card, hasn't played/passed yet

    // Preview: if human drew a card, show that; else hovered > selected
    const drawnCard = hasDrawn
        ? state.players[0].hand.find(c => c.id === state.drawnCardId) || null
        : null;
    const previewCard = drawnCard || hoveredCard || selectedCard;

    // Auto-scroll log to bottom
    useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, [state.log]);

    // AI turns with visible timer
    useEffect(() => {
        if (state.phase !== "playing") return;
        const cur = state.players[state.currentPlayer];
        if (cur?.isHuman) { setAiThinking(false); return; }

        setAiThinking(true);
        aiTimerRef.current = setTimeout(() => {
            setAiThinking(false);
            setState(prev => {
                if (prev.phase !== "playing") return prev;
                const player = prev.players[prev.currentPlayer];
                if (player?.isHuman) return prev;
                const card = aiChooseCard(player.hand, prev.activeValence);
                if (!card) return applyDrawAI(prev);
                const needsValence =
                    (card.type === "element" && card.valences.length > 1) ||
                    (card.type === "special" && (card.special === "wild" || card.special === "wild4"));
                if (needsValence) {
                    const v = aiChooseValence(player.hand.filter(c => c.id !== card.id), card);
                    return applyPlayCard(prev, card.id, v);
                }
                return applyPlayCard(prev, card.id, card.valences?.[0] || null);
            });
        }, AI_DELAY);

        return () => clearTimeout(aiTimerRef.current);
    }, [state.currentPlayer, state.phase]);

    const handleCardClick = useCallback((card) => {
        if (!isHumanTurn) return;
        if (!canPlay(card, state.activeValence)) return;
        setSelectedCard(prev => prev?.id === card.id ? null : card);
    }, [isHumanTurn, state.activeValence]);

    const handlePlayCard = useCallback((cardOverride) => {
        const card = cardOverride || selectedCard;
        if (!card) return;
        const needsValence =
            (card.type === "element" && card.valences.length > 1) ||
            (card.type === "special" && (card.special === "wild" || card.special === "wild4"));
        if (needsValence) {
            setState(prev => applyPlayCard(prev, card.id));
        } else {
            setState(prev => applyPlayCard(prev, card.id, card.valences?.[0] || null));
        }
        setSelectedCard(null);
        setHoveredCard(null);
    }, [selectedCard]);

    const handleDraw = useCallback(() => {
        if (!isHumanTurn || hasDrawn) return;
        setSelectedCard(null);
        setHoveredCard(null);
        setState(prev => applyDrawHuman(prev));
    }, [isHumanTurn, hasDrawn]);

    const handlePass = useCallback(() => {
        if (!isHumanTurn || !hasDrawn) return;
        setSelectedCard(null);
        setHoveredCard(null);
        setState(prev => applyPassTurn(prev));
    }, [isHumanTurn, hasDrawn]);

    const handleValenceSelect = useCallback((v) => {
        setState(prev => {
            if (prev.phase !== "selectValence") return prev;
            const card = prev.pendingCard;
            const newState = { ...prev, phase: "playing", pendingCard: null };
            if (card.type === "special" && card.special === "wild4") {
                const target = nextPlayerIdx(newState);
                let ns = giveCards(newState, target, 4);
                ns.activeValence = v;
                ns.log = [...ns.log, `Valencia → ${v}. ${ns.players[target].name} roba 4.`];
                ns.currentPlayer = nextPlayerIdx(ns, true);
                ns.turnCount = (ns.turnCount || 0) + 1;
                return ns;
            }
            if (card.type === "special" && card.special === "wild") {
                const ns = { ...newState, activeValence: v };
                ns.log = [...ns.log, `Valencia → ${v}`];
                ns.currentPlayer = nextPlayerIdx(ns);
                ns.turnCount = (ns.turnCount || 0) + 1;
                return ns;
            }
            const ns = { ...newState, activeValence: v };
            ns.log = [...ns.log, `Valencia → ${v}`];
            ns.currentPlayer = nextPlayerIdx(ns);
            ns.turnCount = (ns.turnCount || 0) + 1;
            return ns;
        });
    }, []);

    if (state.phase === "gameOver") {
        return <GameOverScreen winner={state.winner} players={state.players} turnCount={state.turnCount} onRestart={onGoToMenu} />;
    }

    const humanPlayer = state.players[0];
    const pc1 = state.players[1] || null;
    const pc2 = state.players[2] || null;
    const pc3 = state.players[3] || null;
    const topDiscard = state.discardPile[0];
    const validCards = humanPlayer.hand.filter(c => canPlay(c, state.activeValence));

    return (
        <div style={{
            height: "100vh",
            background: "linear-gradient(160deg, #0d1117 0%, #0f2027 55%, #1a0533 100%)",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            color: "#fff", display: "flex", flexDirection: "column", overflow: "hidden",
        }}>

            {/* ══ TOP BAR ══ */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "7px 14px",
                background: "rgba(0,0,0,0.45)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                flexShrink: 0, gap: 8, position: "relative",
            }}>
                <AiTimerBar active={aiThinking} duration={AI_DELAY} />
                <button onClick={onGoToMenu} style={{
                    background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                    color: "#9ca3af", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12,
                }}>← Menú</button>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>
                        Dir: <b style={{ color: "#d1d5db" }}>{state.direction === 1 ? "→" : "←"}</b>
                    </span>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>
                        Turno: <b style={{ color: "#a78bfa" }}>{state.players[state.currentPlayer]?.name}</b>
                        {aiThinking && <span style={{ color: "#6b7280", fontWeight: 400, marginLeft: 4 }}>pensando...</span>}
                    </span>
                    <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                        background: "rgba(255,255,255,0.07)", padding: "3px 10px", borderRadius: 20,
                    }}>
                        <span style={{ fontSize: 11, color: "#9ca3af" }}>Valencia</span>
                        <span style={{
                            padding: "2px 9px", borderRadius: 10,
                            background: getValenceColor(state.activeValence),
                            color: "#fff", fontWeight: 800, fontSize: 13,
                        }}>{state.activeValence}</span>
                    </div>
                </div>

                <span style={{ fontSize: 11, color: "#6b7280" }}>Mazo: {state.deck.length}</span>
            </div>

            {/* ══ BODY: LOG | CENTER | PREVIEW ══ */}
            <div style={{
                flex: 1, display: "grid",
                gridTemplateColumns: "170px 1fr 148px",
                overflow: "hidden",
            }}>

                {/* ── LEFT: LOG ── */}
                <div style={{
                    borderRight: "1px solid rgba(255,255,255,0.07)",
                    display: "flex", flexDirection: "column", overflow: "hidden",
                }}>
                    <div style={{
                        padding: "7px 10px", fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                        color: "#4b5563", textTransform: "uppercase",
                        borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0,
                    }}>Historial</div>
                    {/* Log items: oldest at top, newest at bottom, scrolled to bottom */}
                    <div ref={logRef} style={{
                        flex: 1, overflowY: "auto", padding: "6px 8px",
                        display: "flex", flexDirection: "column", gap: 3,
                    }}>
                        {state.log.map((l, i) => {
                            const isLatest = i === state.log.length - 1;
                            return (
                                <div key={i} style={{
                                    fontSize: isLatest ? 12 : 10,
                                    lineHeight: 1.5,
                                    fontWeight: isLatest ? 600 : 400,
                                    color: isLatest ? "#e2e8f0" : i === state.log.length - 2 ? "#6b7280" : "#374151",
                                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                                    paddingBottom: 3,
                                    transition: "font-size 0.2s",
                                }}>{l}</div>
                            );
                        })}
                    </div>
                </div>

                {/* ── CENTER ── */}
                <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>

                    {/* PC1 — top center, horizontal cards */}
                    <div style={{
                        display: "flex", justifyContent: "center",
                        padding: "8px 10px 4px", flexShrink: 0,
                    }}>
                        {pc1 ? (
                            <OpponentPanel player={pc1} isActive={state.currentPlayer === 1} />
                        ) : (
                            <div style={{ height: 70 }} />
                        )}
                    </div>

                    {/* PC2 | TABLE | PC3 — middle row */}
                    <div style={{
                        flex: 1,
                        display: "grid",
                        gridTemplateColumns: (pc2 || pc3) ? "120px 1fr 120px" : "1fr",
                        alignItems: "center", gap: 6, padding: "0 6px",
                        overflow: "hidden",
                    }}>

                        {/* PC2 — left, horizontal cards */}
                        {(pc2 || pc3) && (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {pc2 && <OpponentPanel player={pc2} isActive={state.currentPlayer === 2} />}
                            </div>
                        )}

                        {/* CENTER TABLE */}
                        <div style={{
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center", gap: 14,
                        }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 9, color: "#6b7280", marginBottom: 4, letterSpacing: 1.5 }}>MESA</div>
                                {topDiscard && <ChemCard card={topDiscard} disabled />}
                            </div>

                            <div style={{
                                width: 50, height: 50, borderRadius: "50%",
                                background: getValenceColor(state.activeValence),
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 16, fontWeight: 900, color: "#fff",
                                boxShadow: "0 0 22px " + getValenceColor(state.activeValence) + "99",
                            }}>{state.activeValence}</div>

                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 9, color: "#6b7280", marginBottom: 4, letterSpacing: 1.5 }}>MAZO</div>
                                <div onClick={isHumanTurn && !hasDrawn ? handleDraw : undefined}
                                    style={{ cursor: isHumanTurn && !hasDrawn ? "pointer" : "default" }}>
                                    <ChemCard
                                        card={{ symbol: "?", name: "Robar", valences: [], type: "special" }}
                                        faceDown disabled={!isHumanTurn || hasDrawn}
                                    />
                                </div>
                                <div style={{ fontSize: 9, color: "#6b7280", marginTop: 3 }}>{state.deck.length} cartas</div>
                                {isHumanTurn && !hasDrawn && (
                                    <button onClick={handleDraw} style={{
                                        marginTop: 5, padding: "3px 10px", borderRadius: 5,
                                        border: "1px solid rgba(255,255,255,0.12)",
                                        background: "rgba(255,255,255,0.05)",
                                        color: "#9ca3af", fontSize: 10, cursor: "pointer",
                                    }}>Robar</button>
                                )}
                                {isHumanTurn && hasDrawn && (
                                    <button onClick={handlePass} style={{
                                        marginTop: 5, padding: "3px 10px", borderRadius: 5,
                                        border: "1px solid rgba(255,165,0,0.4)",
                                        background: "rgba(255,165,0,0.1)",
                                        color: "#fbbf24", fontSize: 10, cursor: "pointer", fontWeight: 700,
                                    }}>Pasar turno</button>
                                )}
                            </div>
                        </div>

                        {/* PC3 — right, horizontal cards */}
                        {(pc2 || pc3) && (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {pc3 && <OpponentPanel player={pc3} isActive={state.currentPlayer === 3} />}
                            </div>
                        )}
                    </div>

                    {/* ── HUMAN HAND — bottom center, centered ── */}
                    <div style={{
                        borderTop: "1px solid rgba(255,255,255,0.07)",
                        padding: "8px 12px", flexShrink: 0,
                        background: "rgba(0,0,0,0.22)",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: isHumanTurn ? "#a78bfa" : "#6b7280" }}>
                                Tu mano ({humanPlayer.hand.length})
                            </span>
                            {humanPlayer.hand.length === 1 && (
                                <span style={{ color: "#fbbf24", fontSize: 12, fontWeight: 800 }}>¡UNO!</span>
                            )}
                            {hasDrawn && (
                                <span style={{ fontSize: 10, color: "#fbbf24", fontWeight: 600, marginLeft: 4 }}>
                                    Carta robada destacada — juégala o pasa
                                </span>
                            )}
                            {isHumanTurn && !hasDrawn && validCards.length === 0 && (
                                <span style={{ fontSize: 10, color: "#ef4444" }}>Sin jugadas — roba una carta</span>
                            )}
                            {!isHumanTurn && (
                                <span style={{ fontSize: 10, color: "#6b7280", fontStyle: "italic" }}>
                                    Turno de {state.players[state.currentPlayer]?.name}...
                                </span>
                            )}
                        </div>

                        {/* Cards row — centered */}
                        <div style={{
                            display: "flex", gap: 5, justifyContent: "center",
                            overflowX: "auto", paddingBottom: 4, alignItems: "flex-end",
                        }}>
                            {humanPlayer.hand.map(card => {
                                const playable = canPlay(card, state.activeValence);
                                const sel = selectedCard?.id === card.id;
                                const isJustDrawn = card.id === state.drawnCardId;
                                return (
                                    <div key={card.id}
                                        style={{ position: "relative", flexShrink: 0 }}
                                        onMouseEnter={() => setHoveredCard(card)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <ChemCard
                                            card={card}
                                            selected={sel}
                                            glowing={isJustDrawn && playable}
                                            disabled={!isHumanTurn || !playable}
                                            onClick={() => {
                                                if (isJustDrawn && playable) { handlePlayCard(card); return; }
                                                handleCardClick(card);
                                            }}
                                        />
                                        {isHumanTurn && playable && !sel && !isJustDrawn && (
                                            <div style={{
                                                position: "absolute", top: -4, right: -4,
                                                width: 8, height: 8, borderRadius: "50%",
                                                background: "#22c55e", border: "1.5px solid #0d1117",
                                            }} />
                                        )}
                                        {isJustDrawn && (
                                            <div style={{
                                                position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)",
                                                background: "#fbbf24", color: "#000",
                                                fontSize: 8, fontWeight: 800, borderRadius: 4, padding: "1px 4px",
                                                whiteSpace: "nowrap",
                                            }}>NUEVA</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: CARD PREVIEW ── */}
                <div style={{
                    borderLeft: "1px solid rgba(255,255,255,0.07)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", padding: "14px 8px", gap: 0,
                    overflow: "hidden",
                }}>
                    <CardPreview
                        card={previewCard}
                        activeValence={state.activeValence}
                        isHumanTurn={isHumanTurn}
                        isDrawnCard={!!drawnCard && previewCard?.id === drawnCard?.id}
                        onPlay={() => handlePlayCard(previewCard)}
                    />
                </div>
            </div>

            {/* Valence Modal */}
            {state.phase === "selectValence" && state.pendingCard && (
                <ValenceModal card={state.pendingCard} onSelect={handleValenceSelect} />
            )}
        </div>
    );
}

// ============================================================
// ROOT
// ============================================================

export default function UnoQuimico() {
    const [screen, setScreen] = useState("menu");
    const [numPCs, setNumPCs] = useState(1);

    const handleStart = (n) => { setNumPCs(n); setScreen("game"); };

    if (screen === "menu") return <MenuScreen onStart={handleStart} />;
    return <GameBoard key={numPCs + "-" + Date.now()} numPCs={numPCs} onGoToMenu={() => setScreen("menu")} />;
}