import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Eye, EyeOff, Users, Clock, Trophy, Check, X, ArrowLeft, Award, RefreshCw } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Datos químicos                                                     */
/* ------------------------------------------------------------------ */
const RAW_DATA = {
  quimica: {
    electrovalencia_positiva_fija: [
      { valencia: 1, elementos: ["Li", "Na", "K", "Rb", "Cs", "Fr", "Ag", "NH4+"] },
      { valencia: 2, elementos: ["Be", "Mg", "Ca", "Sr", "Ba", "Ra", "Cd", "Zn"] },
      { valencia: 3, elementos: ["Al", "Bi", "Ga", "In", "Eu", "Gd", "Sc"] },
      { valencia: 4, elementos: ["Hf", "Ir", "Os", "Th", "Zr", "Pd", "Ti", "Pt"] },
      { valencia: 6, elementos: ["U", "W", "Mo"] },
    ],
    electrovalencia_positiva_variable: [
      { valencias: [1, 2], elementos: ["Cu", "Hg"] },
      { valencias: [1, 3], elementos: ["Au", "Tl"] },
      { valencias: [2, 3], elementos: ["Fe", "Co", "Ni", "Cr", "Mn"] },
      { valencias: [2, 4], elementos: ["Pb", "Sn"] },
      { valencias: [3, 4], elementos: ["Ce", "Pr"] },
      { valencias: [3, 5], elementos: ["Nb", "Ta", "V"] },
      { valencias: [6], elementos: ["Cr"] },
      { valencias: [4, 6, 7], elementos: ["Mn"] },
    ],
    electrovalencia_negativa: [
      { valencia: 1, elementos: ["F", "Cl", "Br", "I", "CN-"] },
      { valencia: 2, elementos: ["O", "S", "Se", "Te"] },
      { valencia: 3, elementos: ["N", "P", "As", "Sb"] },
      { valencia: 4, elementos: ["C", "Si", "Ge"] },
    ],
    covalencia: [
      { valencias: [1, 3, 5, 7], elementos: ["Cl", "Br"] },
      { valencias: [4, 6], elementos: ["S", "Se"] },
      { valencias: [1, 3, 5], elementos: ["N", "P", "As"] },
      { valencias: [2, 4], elementos: ["C", "Si"] },
      { valencias: [3], elementos: ["B"] },
      { valencias: [1], elementos: ["H"] },
    ],
  },
};

const NAME_MAP = {
  Li: "Litio", Na: "Sodio", K: "Potasio", Rb: "Rubidio", Cs: "Cesio", Fr: "Francio",
  Ag: "Plata", "NH4+": "Amonio", Be: "Berilio", Mg: "Magnesio", Ca: "Calcio",
  Sr: "Estroncio", Ba: "Bario", Ra: "Radio", Cd: "Cadmio", Zn: "Zinc", Al: "Aluminio",
  Bi: "Bismuto", Ga: "Galio", In: "Indio", Eu: "Europio", Gd: "Gadolinio", Sc: "Escandio",
  Hf: "Hafnio", Ir: "Iridio", Os: "Osmio", Th: "Torio", Zr: "Zirconio", Pd: "Paladio",
  Ti: "Titanio", Pt: "Platino", U: "Uranio", W: "Tungsteno", Mo: "Molibdeno",
  Cu: "Cobre", Hg: "Mercurio", Au: "Oro", Tl: "Talio", Fe: "Hierro", Co: "Cobalto",
  Ni: "Níquel", Cr: "Cromo", Mn: "Manganeso", Pb: "Plomo", Sn: "Estaño", Ce: "Cerio",
  Pr: "Praseodimio", Nb: "Niobio", Ta: "Tántalo", V: "Vanadio", F: "Flúor", Cl: "Cloro",
  Br: "Bromo", I: "Yodo", "CN-": "Cianuro", O: "Oxígeno", S: "Azufre", Se: "Selenio",
  Te: "Telurio", N: "Nitrógeno", P: "Fósforo", As: "Arsénico", Sb: "Antimonio",
  C: "Carbono", Si: "Silicio", Ge: "Germanio", B: "Boro", H: "Hidrógeno",
};

function buildPool() {
  const map = {};
  Object.values(RAW_DATA.quimica).forEach((group) => {
    group.forEach((entry) => {
      const valences = entry.valencia !== undefined ? [entry.valencia] : entry.valencias;
      entry.elementos.forEach((sym) => {
        if (!map[sym]) map[sym] = new Set();
        valences.forEach((v) => map[sym].add(v));
      });
    });
  });
  return Object.entries(map).map(([symbol, set]: any) => ({
    symbol,
    name: NAME_MAP[symbol] || symbol,
    valences: [...set].sort((a, b) => a - b),
  }));
}

const POOL = buildPool();
const ALL_OPTIONS = [1, 2, 3, 4, 5, 6, 7];
const DECK_SIZE = 15;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/* ------------------------------------------------------------------ */
/*  Supabase (REST directo, sin cliente)                               */
/* ------------------------------------------------------------------ */
const SUPABASE_URL = "https://uvbxanhdlstrowzhcmpn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_m31ZBq9pU_g45hyEhKM1FA__inc7ft1";

/* ------------------------------------------------------------------ */
/* Configuración para la nueva tabla "resultados_juego"              */
/* ------------------------------------------------------------------ */

async function saveScore({ name, score, total, aciertos, tiempo }) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/resultados_juego`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify([{
      name,
      score,
      total_preguntas: total,
      aciertos,
      tiempo_segundos: tiempo
    }]),
  });

  if (!res.ok) throw new Error("No se pudo guardar en la nueva tabla");
}

async function getLeaderboard() {
  // Ordenamos por aciertos (desc) y luego por tiempo (asc)
  const url = `${SUPABASE_URL}/rest/v1/resultados_juego?select=*&order=aciertos.desc,tiempo_segundos.asc&limit=50`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!res.ok) throw new Error("No se pudo cargar la tabla");
  return res.json();
}

/* ------------------------------------------------------------------ */
/*  Estilos / fuentes                                                  */
/* ------------------------------------------------------------------ */
const FONTS = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,600&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
    .vf-display { font-family: 'Fraunces', serif; }
    .vf-mono { font-family: 'Space Mono', monospace; }
    .vf-body { font-family: 'Inter', sans-serif; }
    @keyframes vf-flip-in {
      from { opacity: 0; transform: rotateY(90deg) scale(0.9); }
      to { opacity: 1; transform: rotateY(0deg) scale(1); }
    }
    .vf-card-enter { animation: vf-flip-in 0.35s ease-out; }
    @keyframes vf-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(201,162,39,0.4); }
      50% { box-shadow: 0 0 0 10px rgba(201,162,39,0); }
    }
    .vf-pulse { animation: vf-pulse 1.8s infinite; }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  Componente raíz                                                    */
/* ------------------------------------------------------------------ */
export default function Barajas() {
  const [screen, setScreen] = useState("start"); // start | game | result | leaderboard
  const [playerName, setPlayerName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const [deck, setDeck] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showElementName, setShowElementName] = useState(false);
  const [answered, setAnswered] = useState(null); // {chosen, correct}

  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const [leaderboard, setLeaderboard] = useState([]);
  const [lbLoading, setLbLoading] = useState(false);
  const [lbError, setLbError] = useState("");
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [returnToAfterLB, setReturnToAfterLB] = useState("start");

  const finalPct = deck.length ? Math.round((score / deck.length) * 100) : 0;

  /* ------- Cronómetro ------- */
  useEffect(() => {
    if (screen === "game") {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [screen]);

  const openLeaderboard = useCallback((from) => {
    setReturnToAfterLB(from);
    setScreen("leaderboard");
    setLbLoading(true);
    setLbError("");

    // Llamada corregida
    getLeaderboard()
      .then((data) => setLeaderboard(data))
      .catch((err) => setLbError(err.message))
      .finally(() => setLbLoading(false));
  }, []);

  const startFlow = () => {
    setNameInput("");
    setShowNameModal(true);
  };

  const confirmName = () => {
    const name = nameInput.trim() || "Participante";
    setPlayerName(name);
    setShowNameModal(false);
    const newDeck = shuffle(POOL).slice(0, Math.min(DECK_SIZE, POOL.length));
    setDeck(newDeck);
    setIndex(0);
    setScore(0);
    setElapsed(0);
    setShowElementName(false);
    setAnswered(null);
    setSaveState("idle");
    setScreen("game");
  };

  const handleChoice = (val) => {
    if (answered) return;
    const current = deck[index];
    const correct = current.valences.includes(val);
    if (correct) setScore((s) => s + 1);
    setAnswered({ chosen: val, correct });
    setTimeout(() => {
      if (index + 1 < deck.length) {
        setIndex((i) => i + 1);
        setShowElementName(false);
        setAnswered(null);
      } else {
        setScreen("result");
      }
    }, 900);
  };

  const handleSave = async () => {
    setSaveState("saving");
    try {
      // Usamos 'elapsed' que ya tienes en el estado de tu componente
      await saveScore({
        name: playerName,
        score: score,             // Puntos o Aciertos
        total: deck.length,       // Total de preguntas
        aciertos: score,          // Nuevo campo para la BD
        tiempo: elapsed           // Usamos tu estado 'elapsed'
      });
      setSaveState("saved");
      openLeaderboard("result");
    } catch (e) {
      console.error("Error al guardar:", e);
      setSaveState("error");
    }
  };

  const playAgain = () => {
    setScreen("start");
  };

  /* ------------------------------------------------------------------ */
  return (
    <div
      className="vf-body min-h-screen w-full flex items-center justify-center p-4"
      style={{
        background: "radial-gradient(circle at 50% 0%, #1A202C 0%, #0F172A 70%, #020617 100%)",
      }}
    >
      {FONTS}
      <div className="w-full max-w-xl">
        {screen === "start" && (
          <StartScreen onStart={startFlow} onLeaderboard={() => openLeaderboard("start")} />
        )}

        {screen === "game" && deck.length > 0 && (
          <GameScreen
            deck={deck}
            index={index}
            score={score}
            elapsed={elapsed}
            showElementName={showElementName}
            setShowElementName={setShowElementName}
            answered={answered}
            onChoice={handleChoice}
          />
        )}

        {screen === "result" && (
          <ResultScreen
            playerName={playerName}
            score={score}
            total={deck.length}
            pct={finalPct}
            elapsed={elapsed}
            saveState={saveState}
            onSave={handleSave}
            onPlayAgain={playAgain}
            onViewLeaderboard={() => openLeaderboard("result")}
          />
        )}

        {screen === "leaderboard" && (
          <LeaderboardScreen
            data={leaderboard}
            loading={lbLoading}
            error={lbError}
            highlightName={playerName}
            onBack={() => setScreen(returnToAfterLB)}
          />
        )}
      </div>

      {showNameModal && (
        <NameModal
          value={nameInput}
          setValue={setNameInput}
          onConfirm={confirmName}
          onCancel={() => setShowNameModal(false)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pantalla de inicio                                                 */
/* ------------------------------------------------------------------ */
function StartScreen({ onStart, onLeaderboard }) {
  return (
    <div className="flex flex-col items-center vf-card-enter">
      <p className="vf-mono text-xs tracking-[0.35em] text-[#C9A227] mb-3 uppercase">
        Juego de cartas · Química
      </p>
      <h1 className="vf-display text-5xl sm:text-6xl text-[#F5EFE0] text-center leading-tight mb-1">
        Barajas de
      </h1>
      <h1 className="vf-display italic text-5xl sm:text-6xl text-[#C9A227] text-center leading-tight mb-8">
        Valencias
      </h1>

      {/* Carta decorativa */}
      <div
        className="relative w-40 h-56 rounded-2xl mb-10 flex items-center justify-center shadow-2xl"
        style={{
          // Un gradiente de blanco perla a un gris muy suave
          background: "linear-gradient(155deg, #F8FAFC 0%, #E2E8F0 100%)",
          // Un borde sutil de color oro pálido para dar elegancia
          border: "1px solid rgba(245, 158, 11, 0.3)",
        }}
      >
        {/* Texto con color grafito (más suave que negro puro) */}
        <span className="absolute top-3 left-4 font-mono text-sm text-[#475569] font-bold">V</span>
        <span className="absolute bottom-3 right-4 font-mono text-sm text-[#475569] font-bold rotate-180">V</span>

        {/* Símbolo central */}
        <span className="text-6xl text-[#1E293B] font-bold">?</span>
      </div>

      <button
        onClick={onStart}
        className="vf-body flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C9A227] text-[#04140D] font-semibold text-lg hover:bg-[#FFDD6B] transition-colors shadow-lg"
      >
        <Play size={20} fill="#04140D" /> Comenzar
      </button>

      <button
        onClick={onLeaderboard}
        className="vf-body flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full border border-[#3a5560] text-[#C7E3D4] hover:border-[#C9A227] hover:text-[#C9A227] transition-colors text-sm"
      >
        <Users size={16} /> Ver participantes
      </button>

      <p className="vf-mono text-[11px] text-[#6FA88C] mt-8 text-center max-w-sm">
        Se te mostrarán {DECK_SIZE} cartas al azar. Elige la valencia correcta de cada símbolo antes de que se acabe el tiempo.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal de nombre                                                    */
/* ------------------------------------------------------------------ */
function NameModal({ value, setValue, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(8px)"
      }}
    >
      <div
        className="vf-card-enter w-full max-w-sm rounded-3xl p-8"
        style={{
          background: "#1E293B",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
      >
        <h2 className="text-2xl font-bold text-slate-100 mb-2">¿Cómo te llamas?</h2>
        <p className="text-sm text-slate-400 mb-6">
          Tu nombre aparecerá en el ranking de participantes.
        </p>

        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onConfirm()}
          placeholder="Escribe tu nombre..."
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-600 outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all mb-6"
        />

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl text-slate-400 hover:text-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-[#F59E0B] text-slate-900 font-bold hover:bg-[#D97706] transition-all shadow-lg hover:shadow-[#F59E0B]/20"
          >
            Empezar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pantalla de juego                                                  */
/* ------------------------------------------------------------------ */
function GameScreen({ deck, index, score, elapsed, showElementName, setShowElementName, answered, onChoice }) {
  const card = deck[index];

  return (
    <div className="vf-card-enter">
      {/* Barra superior */}
      <div className="flex items-center justify-between mb-6 vf-mono text-sm text-[#C7E3D4]">
        <div className="flex items-center gap-1.5">
          <Trophy size={15} className="text-[#C9A227]" /> {score}
        </div>
        <div className="text-[#9FC4B0]">
          Carta {index + 1} / {deck.length}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={15} className="text-[#C9A227]" /> {formatTime(elapsed)}
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-full h-1 rounded-full bg-[#163A2A] mb-8 overflow-hidden">
        <div
          className="h-full bg-[#C9A227] transition-all duration-300"
          style={{ width: `${((index + (answered ? 1 : 0)) / deck.length) * 100}%` }}
        />
      </div>

      {/* Carta */}
      <div className="flex flex-col items-center">
        <div
          key={index}
          className="vf-card-enter relative w-48 h-64 rounded-2xl flex flex-col items-center justify-center mb-3"
          style={{
            background: "linear-gradient(155deg, #F5EFE0 0%, #E8DFC7 100%)",
            border: `1px solid ${answered ? (answered.correct ? "#16C79A" : "#FF5C4D") : "#C9A227"
              }`,
            boxShadow: "0 20px 45px -15px rgba(0,0,0,0.6)",
            transition: "border-color 0.2s",
          }}
        >
          <span className="absolute top-3 left-4 vf-mono text-xs text-[#04140D] opacity-60">
            {index + 1}
          </span>
          <span className="absolute bottom-3 right-4 vf-mono text-xs text-[#04140D] opacity-60 rotate-180">
            {index + 1}
          </span>

          <span className="vf-display text-6xl text-[#04140D] leading-none">{card.symbol}</span>

          {showElementName && (
            <span className="vf-body text-sm text-[#5c4a1e] mt-3">{card.name}</span>
          )}

          {answered && (
            <div
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: answered.correct ? "#16C79A" : "#FF5C4D" }}
            >
              {answered.correct ? (
                <Check size={18} color="#F5EFE0" />
              ) : (
                <X size={18} color="#F5EFE0" />
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setShowElementName((v) => !v)}
          className="vf-body flex items-center gap-1.5 text-xs text-[#9FC4B0] hover:text-[#C9A227] transition-colors mb-8"
        >
          {showElementName ? <EyeOff size={14} /> : <Eye size={14} />}
          {showElementName ? "Ocultar nombre" : "Ver nombre"}
        </button>

        {/* Opciones de valencia */}
        <div className="grid grid-cols-4 gap-2.5 w-full max-w-sm">
          {ALL_OPTIONS.map((val) => {
            const isCorrectAnswer = card.valences.includes(val);
            let stateClasses = "border-[#1F4B39] text-[#C7E3D4] hover:border-[#C9A227] hover:text-[#C9A227]";
            if (answered) {
              if (isCorrectAnswer) {
                stateClasses = "border-[#16C79A] bg-[#16C79A] text-[#F5EFE0]";
              } else if (val === answered.chosen) {
                stateClasses = "border-[#FF5C4D] bg-[#FF5C4D] text-[#F5EFE0]";
              } else {
                stateClasses = "border-[#163A2A] text-[#4C7861]";
              }
            }
            return (
              <button
                key={val}
                disabled={!!answered}
                onClick={() => onChoice(val)}
                className={`vf-mono py-3 rounded-lg border font-bold text-lg transition-colors ${stateClasses}`}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pantalla de resultado                                              */
/* ------------------------------------------------------------------ */
function ResultScreen({ playerName, score, total, pct, elapsed, saveState, onSave, onPlayAgain, onViewLeaderboard }) {
  return (
    <div className="vf-card-enter flex flex-col items-center text-center">
      <Award size={40} className="text-[#C9A227] mb-4" />
      <p className="vf-mono text-xs tracking-[0.3em] text-[#9FC4B0] uppercase mb-1">Resultado de</p>
      <h2 className="vf-display text-3xl text-[#F5EFE0] mb-6">{playerName}</h2>

      <div className="grid grid-cols-3 gap-3 w-full max-w-sm mb-8">
        <StatBox label="Puntaje" value={`${score}/${total}`} />
        <StatBox label="Precisión" value={`${pct}%`} />
        <StatBox label="Tiempo" value={formatTime(elapsed)} />
      </div>

      {saveState !== "saved" && (
        <button
          onClick={onSave}
          disabled={saveState === "saving"}
          className="vf-body flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C9A227] text-[#04140D] font-semibold text-lg hover:bg-[#FFDD6B] transition-colors shadow-lg disabled:opacity-60 mb-3"
        >
          {saveState === "saving" ? "Guardando..." : "Guardar puntaje y ver tabla"}
        </button>
      )}

      {saveState === "error" && (
        <p className="text-[#FF5C4D] text-sm mb-3">
          No se pudo guardar el puntaje. Revisa tu conexión e inténtalo de nuevo.
        </p>
      )}

      <div className="flex gap-3 mt-2">
        <button
          onClick={onPlayAgain}
          className="vf-body flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1F4B39] text-[#C7E3D4] hover:border-[#C9A227] hover:text-[#C9A227] transition-colors text-sm"
        >
          <RefreshCw size={15} /> Jugar de nuevo
        </button>
        <button
          onClick={onViewLeaderboard}
          className="vf-body flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1F4B39] text-[#C7E3D4] hover:border-[#C9A227] hover:text-[#C9A227] transition-colors text-sm"
        >
          <Users size={15} /> Ver participantes
        </button>
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="rounded-xl py-4 px-2" style={{ background: "#0E2E22", border: "1px solid #1F4B39" }}>
      <p className="vf-mono text-[10px] tracking-widest text-[#9FC4B0] uppercase mb-1">{label}</p>
      <p className="vf-display text-2xl text-[#F5EFE0]">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tabla de participantes                                             */
/* ------------------------------------------------------------------ */
function LeaderboardScreen({ data, loading, error, highlightName, onBack }) {
  return (
    <div className="vf-card-enter p-6 rounded-3xl" style={{ background: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(12px)" }}>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#F59E0B] transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Volver
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
          <Users size={24} className="text-[#F59E0B]" />
        </div>
        <h2 className="text-3xl font-bold text-slate-100">Top Participantes</h2>
      </div>

      {loading && <p className="text-slate-400 text-sm">Cargando clasificación...</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p className="text-slate-500 text-sm italic">Todavía no hay resultados registrados.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="space-y-2">
          {/* Encabezados de tabla */}
          <div className="flex items-center justify-between px-6 py-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            <span>Jugador</span>
            <div className="flex gap-8">
              <span>Aciertos</span>
              <span>Tiempo</span>
            </div>
          </div>

          {/* Lista de filas */}
          {data.map((row, i) => {
            const mine = row.name === highlightName;
            return (
              <div
                key={row.id ?? i}
                className="flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300"
                style={{
                  background: mine ? "rgba(56, 189, 248, 0.08)" : "rgba(255, 255, 255, 0.03)",
                  border: mine ? "1px solid #38BDF8" : "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm w-6 text-slate-500">
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                  </span>
                  <span className={`font-semibold ${mine ? "text-[#38BDF8]" : "text-slate-200"}`}>
                    {row.name}
                  </span>
                </div>

                <div className="flex items-center gap-8 font-mono text-sm">
                  <span className="text-slate-300">
                    {row.aciertos} <span className="text-slate-600">/ {row.total_preguntas}</span>
                  </span>
                  <span className="text-[#F59E0B] font-bold w-14 text-right">
                    {row.tiempo_segundos}s
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
