import React from "react";
import { useGameLogic } from "./useGameLogic";
import { SetupScreen } from "./SetupScreen";
import { Board } from "./Board";
import { QuestionPanel } from "./QuestionPanel";
import { DicePanel } from "./DicePanel";
import { WinnerScreen } from "./WinnerScreen";
import "./SerpientesEscaleras.css";

export const SerpientesEscaleras: React.FC = () => {
  const {
    state,
    startGame,
    submitAnswer,
    proceedAfterAnswer,
    rollDice,
    nextTurn,
    resetGame,
    closeModal
  } = useGameLogic();

  const currentPlayer =
    state.players[state.currentTurn] ?? null;

  // ── Pantalla de configuración ────────────────────────────────
  if (state.phase === "setup") {
    return (
      <div className="se-page">
        <SetupScreen onStart={startGame} />
      </div>
    );
  }

  // ── Pantalla ganador ────────────────────────────────────────
  if (state.phase === "winner") {
    const winner = state.players.find((p) =>
      state.event?.message.includes(p.name)
    ) ?? state.players[state.currentTurn];
    return (
      <div className="se-page">
        <WinnerScreen
          winner={winner}
          players={state.players}
          onPlayAgain={resetGame}
        />
      </div>
    );
  }

  // ── Juego activo ────────────────────────────────────────────
  return (
    <div className="se-page">
      {/* Encabezado */}
      <header className="se-header">
        <div className="se-header-left">
          <span className="se-logo">🐍🪜</span>
          <div>
            <h1 className="se-title">Serpientes y Escaleras</h1>
            <p className="se-subtitle">Aprendizaje Social</p>
          </div>
        </div>
        <button className="se-exit-btn" onClick={resetGame}>
          ← Salir
        </button>
      </header>

      <div className="se-game-layout">
        {/* Tablero */}
        <div className="se-board-area">
          <Board players={state.players} />

          {/* Leyenda */}
          <div className="board-legend">
            <div className="legend-item">
              <span className="legend-dot snake-dot" />
              Serpiente (baja)
            </div>
            <div className="legend-item">
              <span className="legend-dot ladder-dot" />
              Escalera (sube)
            </div>
            {state.players.map((p) => (
              <div key={p.id} className="legend-item">
                <span className="legend-dot" style={{ background: p.color }} />
                {p.name} ({p.type === "ai" ? "🤖" : "👤"}) — {p.position}
              </div>
            ))}
          </div>
        </div>

        {/* Panel lateral */}
        <div className="se-sidebar">
          {/* Marcador jugadores */}
          <div className="scoreboard">
            {state.players.map((p, i) => (
              <div
                key={p.id}
                className={`score-row ${i === state.currentTurn ? "active-score" : ""}`}
                style={
                  i === state.currentTurn
                    ? { borderColor: p.color, background: p.colorLight }
                    : {}
                }
              >
                <div
                  className="score-avatar"
                  style={{ background: p.color }}
                >
                  {i + 1}
                </div>
                <div className="score-info">
                  <span className="score-name">{p.name}</span>
                  <span className="score-pos">Casilla {p.position}</span>
                </div>
                <span className="score-type">
                  {p.type === "ai" ? "🤖" : "👤"}
                </span>
                {i === state.currentTurn && (
                  <span className="active-badge">Turno</span>
                )}
              </div>
            ))}
          </div>

          {/* Panel de pregunta o dado */}
          {currentPlayer && (
            <>
              {(state.phase === "question" || state.phase === "answer_result") && state.question && (
                <QuestionPanel
                  question={state.question}
                  player={currentPlayer}
                  selectedAnswer={state.selectedAnswer}
                  isCorrect={state.isCorrect}
                  aiThinking={state.aiThinking}
                  onAnswer={submitAnswer}
                />
              )}

              {state.phase === "answer_result" && state.isCorrect !== null && (
                <button
                  className={state.isCorrect ? "roll-btn" : "next-btn"}
                  onClick={proceedAfterAnswer}
                  style={{ marginTop: 8 }}
                >
                  {state.isCorrect ? "🎲 Ir a lanzar dado →" : "Siguiente turno →"}
                </button>
              )}

              {(state.phase === "dice" || state.phase === "moving") && (
                <DicePanel
                  player={currentPlayer}
                  diceValue={state.diceValue}
                  rolling={state.rollingDice}
                  event={state.event}
                  phase={state.phase}
                  onRoll={rollDice}
                  onNext={nextTurn}
                />
              )}
            </>
          )}
        </div>
      </div>
      {state.showObstacleModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-card">
            <div className="modal-icon-banner">
              {state.obstacleModalMessage.includes("🐍") ? "⚠️ ¡Cuidado!" : "🎉 ¡Genial!"}
            </div>
            <div className="modal-body-content">
              <p>{state.obstacleModalMessage}</p>
            </div>
            <button className="modal-btn-action" onClick={closeModal}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SerpientesEscaleras;
