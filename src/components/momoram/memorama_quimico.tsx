import { useState, useEffect, useMemo, useCallback } from "react";
import { RotateCcw, Timer, Trophy, FlaskConical, Sparkles } from "lucide-react";

// ---------------------------------------------------------------
// DATOS QUÍMICOS
// Cada elemento genera 2 cartas: el "elemento" y su "ficha" de datos
// (electronegatividad, carácter metálico, valencia). El memorama
// consiste en emparejar el elemento con su ficha correspondiente.
// ---------------------------------------------------------------
// Bolsa amplia de elementos: en cada partida se eligen 8 al azar
// para que el tablero cambie y cubra distintos puntos del espectro
// metálico → metaloide → no metálico.
const ELEMENT_POOL = [
  { id: "fr", symbol: "Fr", name: "Francio",   z: 87, en: 0.7,  valence: "+1",     metallic: "muy metálico",     tier: "metal-hi" },
  { id: "cs", symbol: "Cs", name: "Cesio",     z: 55, en: 0.79, valence: "+1",     metallic: "muy metálico",     tier: "metal-hi" },
  { id: "rb", symbol: "Rb", name: "Rubidio",   z: 37, en: 0.82, valence: "+1",     metallic: "muy metálico",     tier: "metal-hi" },
  { id: "k",  symbol: "K",  name: "Potasio",   z: 19, en: 0.82, valence: "+1",     metallic: "muy metálico",     tier: "metal-hi" },
  { id: "na", symbol: "Na", name: "Sodio",     z: 11, en: 0.93, valence: "+1",     metallic: "muy metálico",     tier: "metal-hi" },
  { id: "li", symbol: "Li", name: "Litio",     z: 3,  en: 0.98, valence: "+1",     metallic: "muy metálico",     tier: "metal-hi" },
  { id: "ba", symbol: "Ba", name: "Bario",     z: 56, en: 0.89, valence: "+2",     metallic: "metálico",         tier: "metal-mid" },
  { id: "sr", symbol: "Sr", name: "Estroncio", z: 38, en: 0.95, valence: "+2",     metallic: "metálico",         tier: "metal-mid" },
  { id: "ca", symbol: "Ca", name: "Calcio",    z: 20, en: 1.00, valence: "+2",     metallic: "metálico",         tier: "metal-mid" },
  { id: "mg", symbol: "Mg", name: "Magnesio",  z: 12, en: 1.31, valence: "+2",     metallic: "metálico",         tier: "metal-mid" },
  { id: "al", symbol: "Al", name: "Aluminio",  z: 13, en: 1.61, valence: "+3",     metallic: "metálico",         tier: "metal-mid" },
  { id: "ga", symbol: "Ga", name: "Galio",     z: 31, en: 1.81, valence: "+3",     metallic: "metálico",         tier: "metal-mid" },
  { id: "pb", symbol: "Pb", name: "Plomo",     z: 82, en: 1.87, valence: "+2/+4",  metallic: "metálico",         tier: "metal-mid" },
  { id: "si", symbol: "Si", name: "Silicio",   z: 14, en: 1.90, valence: "+4/-4",  metallic: "metaloide",        tier: "metalloid" },
  { id: "ge", symbol: "Ge", name: "Germanio",  z: 32, en: 2.01, valence: "+4/-4",  metallic: "metaloide",        tier: "metalloid" },
  { id: "sb", symbol: "Sb", name: "Antimonio", z: 51, en: 2.05, valence: "+3/+5",  metallic: "metaloide",        tier: "metalloid" },
  { id: "te", symbol: "Te", name: "Telurio",   z: 52, en: 2.10, valence: "+4/-2",  metallic: "metaloide",        tier: "metalloid" },
  { id: "p",  symbol: "P",  name: "Fósforo",   z: 15, en: 2.19, valence: "-3/+5",  metallic: "no metálico",      tier: "nonmetal" },
  { id: "s",  symbol: "S",  name: "Azufre",    z: 16, en: 2.58, valence: "-2/+6",  metallic: "no metálico",      tier: "nonmetal" },
  { id: "i",  symbol: "I",  name: "Yodo",      z: 53, en: 2.66, valence: "-1",     metallic: "no metálico",      tier: "nonmetal" },
  { id: "br", symbol: "Br", name: "Bromo",     z: 35, en: 2.96, valence: "-1",     metallic: "no metálico",      tier: "nonmetal" },
  { id: "n",  symbol: "N",  name: "Nitrógeno", z: 7,  en: 3.04, valence: "-3",     metallic: "no metálico",      tier: "nonmetal" },
  { id: "cl", symbol: "Cl", name: "Cloro",     z: 17, en: 3.16, valence: "-1",     metallic: "no metálico",      tier: "nonmetal" },
  { id: "o",  symbol: "O",  name: "Oxígeno",   z: 8,  en: 3.44, valence: "-2",     metallic: "muy no metálico",  tier: "nonmetal-hi" },
  { id: "f",  symbol: "F",  name: "Flúor",     z: 9,  en: 3.98, valence: "-1",     metallic: "muy no metálico",  tier: "nonmetal-hi" },
];

const TIER_LABEL = {
  "metal-hi": "Carácter metálico alto",
  "metal-mid": "Carácter metálico moderado",
  "metalloid": "Metaloide (frontera)",
  "nonmetal": "Carácter no metálico",
  "nonmetal-hi": "Carácter no metálico alto",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(pairCount = 8) {
  const chosen = shuffle(ELEMENT_POOL).slice(0, pairCount);
  const cards = [];
  chosen.forEach((el) => {
    cards.push({
      uid: `${el.id}-elem`,
      pairId: el.id,
      kind: "element",
      el,
    });
    cards.push({
      uid: `${el.id}-data`,
      pairId: el.id,
      kind: "data",
      el,
    });
  });
  return shuffle(cards);
}

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

const PAIR_COUNT = 8;

export default function MemoramaQuimico() {
  const [deck, setDeck] = useState(() => buildDeck(PAIR_COUNT));
  const [flipped, setFlipped] = useState([]); // uids currently face-up (unmatched)
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [locked, setLocked] = useState(false);
  const [correctFlash, setCorrectFlash] = useState(null); // pairId que acaba de acertar

  const won = matched.size === PAIR_COUNT;

  useEffect(() => {
    if (!running || won) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running, won]);

  const resetGame = useCallback(() => {
    setDeck(buildDeck(PAIR_COUNT));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setSeconds(0);
    setRunning(false);
    setLocked(false);
  }, []);

  const handleFlip = (card) => {
    if (locked) return;
    if (matched.has(card.pairId)) return;
    if (flipped.some((c) => c.uid === card.uid)) return;
    if (flipped.length === 2) return;
    if (!running) setRunning(true);

    const next = [...flipped, card];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [a, b] = next;
      if (a.pairId === b.pairId) {
        setCorrectFlash(a.pairId);
        setTimeout(() => {
          setMatched((prev) => new Set(prev).add(a.pairId));
          setFlipped([]);
          setLocked(false);
          setCorrectFlash(null);
        }, 550);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  useEffect(() => {
    if (won) setRunning(false);
  }, [won]);

  const isFaceUp = (card) =>
    matched.has(card.pairId) || flipped.some((c) => c.uid === card.uid);

  const isMismatched =
    flipped.length === 2 && flipped[0].pairId !== flipped[1].pairId;

  return (
    <div className="mq-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

        .mq-root {
          --bg-deep: #081418;
          --bg-panel: #0f2229;
          --bg-panel-2: #12282f;
          --line: #1e3a41;
          --text: #eaf6f4;
          --muted: #7fa8a3;

          --metal-hi: #e0a052;
          --metal-hi-2: #a86a2a;
          --metal-mid: #d8b978;
          --metal-mid-2: #8a6f34;
          --metalloid: #a893d6;
          --metalloid-2: #6e5aa8;
          --nonmetal: #4fd1c5;
          --nonmetal-2: #1f8f86;
          --nonmetal-hi: #58e6ff;
          --nonmetal-hi-2: #1a7d94;

          font-family: 'Manrope', sans-serif;
          background: radial-gradient(ellipse at top, #0d2126 0%, var(--bg-deep) 60%);
          color: var(--text);
          min-height: 100%;
          padding: 28px 18px 40px;
          box-sizing: border-box;
        }
        .mq-root * { box-sizing: border-box; }

        .mq-wrap { max-width: 760px; margin: 0 auto; }

        .mq-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }
        .mq-title-block { display: flex; gap: 12px; align-items: center; }
        .mq-badge {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, var(--nonmetal-hi), var(--metalloid));
          flex-shrink: 0;
        }
        .mq-title { font-family: 'JetBrains Mono', monospace; font-weight: 800; font-size: 22px; letter-spacing: -0.02em; margin: 0; }
        .mq-subtitle { color: var(--muted); font-size: 13px; margin: 2px 0 0; }

        .mq-stats { display: flex; gap: 10px; flex-wrap: wrap; }
        .mq-stat {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 8px 14px;
          display: flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          min-width: 84px;
        }
        .mq-stat svg { flex-shrink: 0; color: var(--nonmetal-hi); }
        .mq-stat-label { color: var(--muted); font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; display: block; }
        .mq-stat-value { font-weight: 700; }

        .mq-reset {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          color: var(--text);
          border-radius: 10px;
          padding: 8px 14px;
          display: flex; align-items: center; gap: 6px;
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: border-color 0.15s, transform 0.1s;
        }
        .mq-reset:hover { border-color: var(--nonmetal-hi); }
        .mq-reset:active { transform: scale(0.97); }

        .mq-legend {
          display: flex; gap: 14px; flex-wrap: wrap;
          font-size: 11.5px; color: var(--muted);
          margin: 14px 0 20px;
          padding: 10px 14px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--bg-panel);
        }
        .mq-legend-item { display: flex; align-items: center; gap: 6px; }
        .mq-swatch { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }

        .mq-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 480px) {
          .mq-grid { grid-template-columns: repeat(3, 1fr); gap: 9px; }
        }

        .mq-card-slot {
          perspective: 900px;
          aspect-ratio: 3 / 4;
        }
        .mq-card {
          position: relative;
          width: 100%; height: 100%;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(.4,.2,.2,1);
        }
        .mq-card.flipped { transform: rotateY(180deg); }
        .mq-card.shake { animation: mq-shake 0.4s; }
        .mq-card.solved { transform: rotateY(180deg); opacity: 0.55; cursor: default; }

        @keyframes mq-shake {
          0%,100% { transform: rotateY(180deg) translateX(0); }
          25% { transform: rotateY(180deg) translateX(-4px); }
          75% { transform: rotateY(180deg) translateX(4px); }
        }

        .mq-face {
          position: absolute; inset: 0;
          border-radius: 12px;
          backface-visibility: hidden;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 8px;
          border: 1px solid var(--line);
        }
        .mq-face-back {
          background:
            repeating-linear-gradient(135deg, #10262d 0 2px, #0f2329 2px 14px);
          display: flex; align-items: center; justify-content: center;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
        }
        .mq-face-back svg { color: var(--line); opacity: 0.7; transition: color 0.2s, opacity 0.2s; }

        .mq-card-slot:hover .mq-card:not(.flipped):not(.solved) .mq-face-back {
          border-color: var(--nonmetal-hi);
          box-shadow: 0 0 0 2px rgba(88,230,255,0.35), 0 0 22px rgba(88,230,255,0.5), inset 0 0 18px rgba(88,230,255,0.12);
        }
        .mq-card-slot:hover .mq-card:not(.flipped):not(.solved) .mq-face-back svg {
          color: var(--nonmetal-hi);
          opacity: 1;
        }
        .mq-card-slot:hover .mq-card:not(.flipped):not(.solved) {
          transform: translateY(-3px) scale(1.03);
        }

        .mq-face-front {
          transform: rotateY(180deg);
          text-align: center;
          overflow: hidden;
          background: #fbfbf9;
          border-top: 5px solid var(--tier-accent, var(--nonmetal-hi));
          color: var(--tier-ink, #14313a);
          transition: box-shadow 0.25s, filter 0.25s;
        }

        /* Tiers -> encode metallic character via un borde/acento de color
           sobre una base blanca, para que resalte contra el fondo oscuro */
        .tier-metal-hi .mq-face-front    { --tier-accent: var(--metal-hi-2);   --tier-ink: #8a4f12; }
        .tier-metal-mid .mq-face-front   { --tier-accent: var(--metal-mid-2);  --tier-ink: #7a611f; }
        .tier-metalloid .mq-face-front   { --tier-accent: var(--metalloid-2); --tier-ink: #5a458f; }
        .tier-nonmetal .mq-face-front    { --tier-accent: var(--nonmetal-2);   --tier-ink: #106b62; }
        .tier-nonmetal-hi .mq-face-front { --tier-accent: var(--nonmetal-hi-2); --tier-ink: #0d5f74; }

        .mq-card.solved .mq-face-front {
          filter: saturate(1.25) brightness(1.04);
          box-shadow:
            0 0 0 2px var(--tier-accent, var(--nonmetal-hi)),
            0 0 26px 4px color-mix(in srgb, var(--tier-accent, var(--nonmetal-hi)) 55%, transparent),
            0 6px 18px rgba(0,0,0,0.35);
        }

        .mq-card.correct-flash .mq-face-front {
          animation: mq-correct-glow 0.55s ease-out;
        }
        @keyframes mq-correct-glow {
          0% {
            box-shadow: 0 0 0 0 rgba(84, 245, 141, 0);
            filter: brightness(1) saturate(1);
          }
          35% {
            box-shadow: 0 0 0 5px rgba(84, 245, 141, 0.65), 0 0 34px 10px rgba(84, 245, 141, 0.6);
            filter: brightness(1.3) saturate(1.4);
          }
          100% {
            box-shadow: 0 0 0 2px var(--tier-accent, var(--nonmetal-hi)), 0 0 26px 4px color-mix(in srgb, var(--tier-accent, var(--nonmetal-hi)) 55%, transparent);
            filter: brightness(1.04) saturate(1.25);
          }
        }

        .mq-symbol { font-family: 'JetBrains Mono', monospace; font-weight: 800; font-size: clamp(28px, 8vw, 40px); line-height: 1; }
        .mq-z { position: absolute; top: 6px; left: 8px; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 600; opacity: 0.55; }
        .mq-name { font-size: 11.5px; font-weight: 700; margin-top: 4px; opacity: 0.85; }

        .mq-data-line { font-family: 'JetBrains Mono', monospace; font-weight: 800; line-height: 1.35; }
        .mq-data-value { display: block; font-size: clamp(16px, 5vw, 22px); }
        .mq-data-value.mq-data-value-sm { font-size: clamp(11px, 3.4vw, 13px); }
        .mq-data-label { display: block; font-size: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.6; }
        .mq-data-sep { width: 55%; height: 1px; background: currentColor; opacity: 0.15; margin: 5px 0; }

        .mq-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(4, 10, 12, 0.72);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 50;
          animation: mq-fade-in 0.2s ease-out;
        }
        @keyframes mq-fade-in { from { opacity: 0; } to { opacity: 1; } }

        .mq-win {
          text-align: center;
          padding: 30px 26px;
          border-radius: 16px;
          border: 1px solid var(--nonmetal-hi);
          background: linear-gradient(160deg, #10262d, #0a1a1f);
          max-width: 320px;
          width: 100%;
          box-shadow: 0 0 0 1px rgba(88,230,255,0.15), 0 0 44px rgba(88,230,255,0.3), 0 24px 60px rgba(0,0,0,0.5);
          animation: mq-pop-in 0.4s cubic-bezier(.22,1.1,.36,1);
        }
        @keyframes mq-pop-in {
          0% { opacity: 0; transform: scale(0.82) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .mq-win h2 {
          font-family: 'JetBrains Mono', monospace;
          margin: 8px 0 4px;
          font-size: 20px;
        }
        .mq-win p { color: var(--muted); margin: 0 0 14px; font-size: 13.5px; }
        .mq-win-btn {
          background: var(--nonmetal-hi);
          color: #06232b;
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          font-weight: 800;
          font-family: 'Manrope', sans-serif;
          cursor: pointer;
          font-size: 13.5px;
        }
      `}</style>

      <div className="mq-wrap">
        <div className="mq-header">
          <div className="mq-title-block">
            <div className="mq-badge"><FlaskConical size={22} color="#06232b" /></div>
            <div>
              <h1 className="mq-title">Memorama Químico</h1>
              <p className="mq-subtitle">Relaciona el elemento con su ficha: electronegatividad · carácter metálico · valencia</p>
            </div>
          </div>
          <div className="mq-stats">
            <div className="mq-stat">
              <Timer size={15} />
              <div>
                <span className="mq-stat-label">Tiempo</span>
                <span className="mq-stat-value">{formatTime(seconds)}</span>
              </div>
            </div>
            <div className="mq-stat">
              <Sparkles size={15} />
              <div>
                <span className="mq-stat-label">Movs.</span>
                <span className="mq-stat-value">{moves}</span>
              </div>
            </div>
            <button className="mq-reset" onClick={resetGame}>
              <RotateCcw size={14} /> Reiniciar
            </button>
          </div>
        </div>

        <div className="mq-legend">
          <div className="mq-legend-item"><span className="mq-swatch" style={{background: "linear-gradient(135deg,#f6cf8a,#a86a2a)"}}/> Muy metálico</div>
          <div className="mq-legend-item"><span className="mq-swatch" style={{background: "linear-gradient(135deg,#eeddb0,#8a6f34)"}}/> Metálico</div>
          <div className="mq-legend-item"><span className="mq-swatch" style={{background: "linear-gradient(135deg,#cabdec,#6e5aa8)"}}/> Metaloide</div>
          <div className="mq-legend-item"><span className="mq-swatch" style={{background: "linear-gradient(135deg,#8fe9df,#1f8f86)"}}/> No metálico</div>
          <div className="mq-legend-item"><span className="mq-swatch" style={{background: "linear-gradient(135deg,#a6f2ff,#1a7d94)"}}/> Muy no metálico</div>
        </div>

        <div className="mq-grid">
          {deck.map((card) => {
            const up = isFaceUp(card);
            const solved = matched.has(card.pairId);
            const shouldShake = isMismatched && flipped.some((c) => c.uid === card.uid);
            const flashing = correctFlash === card.pairId;
            return (
              <div className="mq-card-slot" key={card.uid}>
                <div
                  className={`mq-card ${up ? "flipped" : ""} ${solved ? "solved" : ""} ${shouldShake ? "shake" : ""} ${flashing ? "correct-flash" : ""} tier-${card.el.tier}`}
                  onClick={() => handleFlip(card)}
                >
                  <div className="mq-face mq-face-back">
                    <FlaskConical size={22} />
                  </div>
                  <div className="mq-face mq-face-front">
                    {card.kind === "element" ? (
                      <>
                        <span className="mq-z">Z={card.el.z}</span>
                        <div className="mq-symbol">{card.el.symbol}</div>
                        <div className="mq-name">{card.el.name}</div>
                      </>
                    ) : (
                      <>
                        <div className="mq-data-line">
                          <span className="mq-data-label">EN</span>
                          <span className="mq-data-value">{card.el.en.toFixed(2)}</span>
                        </div>
                        <div className="mq-data-sep" />
                        <div className="mq-data-line">
                          <span className="mq-data-label">Valencia</span>
                          <span className="mq-data-value">{card.el.valence}</span>
                        </div>
                        <div className="mq-data-sep" />
                        <div className="mq-data-line">
                          <span className="mq-data-label">Carácter</span>
                          <span className="mq-data-value mq-data-value-sm">{card.el.metallic}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {won && (
          <div className="mq-modal-backdrop">
            <div className="mq-win">
              <Trophy size={26} color="#58e6ff" />
              <h2>¡Tabla completa!</h2>
              <p>Resuelto en {moves} movimientos y {formatTime(seconds)}.</p>
              <button className="mq-win-btn" onClick={resetGame}>Jugar de nuevo</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
