import React from "react";
import { Pregunta } from "./preguntas";
import { Player } from "./useGameLogic";

interface QuestionPanelProps {
  question: Pregunta;
  player: Player;
  selectedAnswer: "A" | "B" | "C" | "D" | null;
  isCorrect: boolean | null;
  aiThinking: boolean;
  onAnswer: (answer: "A" | "B" | "C" | "D") => void;
}

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

export const QuestionPanel: React.FC<QuestionPanelProps> = ({
  question,
  player,
  selectedAnswer,
  isCorrect,
  aiThinking,
  onAnswer,
}) => {
  return (
    <div className="question-panel">
      {/* Encabezado del turno */}
      <div className="turn-header" style={{ borderColor: player.color }}>
        <div className="turn-avatar" style={{ background: player.color }}>
          {player.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="turn-name">{player.name}</div>
          <div className="turn-sub">
            {player.type === "ai" ? "🤖 Jugador IA · Gemini" : "👤 Jugador humano"} ·
            Casilla {player.position}
          </div>
        </div>
        {question.categoria && (
          <span className="category-badge">{question.categoria}</span>
        )}
      </div>

      {/* Pregunta con formato "ID. Pregunta" resaltado en rojo */}
      <div className="question-text" style={{ fontWeight: "600", fontSize: "1.1rem", lineHeight: "1.5" }}>
        <span style={{ color: "#dc2626", fontWeight: "800", marginRight: "6px" }}>
          {question.id}.
        </span>
        {question.pregunta}
      </div>

      {/* Opciones */}
      <div className="options-grid">
        {OPTION_LABELS.map((letter, i) => {
          let cls = "option-btn";
          if (selectedAnswer) {
            if (letter === question.respuesta) cls += " correct";
            else if (letter === selectedAnswer) cls += " wrong";
            else cls += " dimmed";
          }
          if (aiThinking) cls += " ai-thinking";

          return (
            <button
              key={letter}
              className={cls}
              disabled={!!selectedAnswer || aiThinking}
              onClick={() => onAnswer(letter)}
            >
              <span className="option-letter">{letter}</span>
              <span className="option-text">{question.opciones[i]}</span>
            </button>
          );
        })}
      </div>

      {/* Estado */}
      {aiThinking && (
        <div className="status-msg thinking">
          <span className="spinner" />
          🤖 {player.name} está pensando...
        </div>
      )}
      {isCorrect === true && (
        <div className="status-msg correct-msg">
          ✅ ¡Correcto! Ahora lanza el dado.
        </div>
      )}
      {isCorrect === false && (
        <div className="status-msg wrong-msg">
          ❌ Incorrecto. La respuesta era <strong>{question.respuesta}</strong>. Pierdes el turno.
        </div>
      )}
    </div>
  );
};
