import React from "react";
import { DICE_FACES } from "./constants";
import { Player, GameEvent } from "./useGameLogic";

interface DicePanelProps {
  player: Player;
  diceValue: number | null;
  rolling: boolean;
  event: GameEvent | null;
  phase: string;
  onRoll: () => void;
  onNext: () => void;
}

export const DicePanel: React.FC<DicePanelProps> = ({
  player,
  diceValue,
  rolling,
  event,
  phase,
  onRoll,
  onNext,
}) => {
  const canRoll = phase === "dice" && !rolling && !diceValue;
  const showNext = phase === "moving" && !!event;

  return (
    <div className="dice-panel">
      <div className="turn-header" style={{ borderColor: player.color }}>
        <div className="turn-avatar" style={{ background: player.color }}>
          {player.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="turn-name">{player.name}</div>
          <div className="turn-sub">Casilla {player.position}</div>
        </div>
      </div>

      <div className="status-msg correct-msg">✅ ¡Respuesta correcta! Lanza el dado.</div>

      {/* Dado */}
      <div className="dice-area">
        <div className={`dice-face ${rolling ? "rolling" : ""}`}>
          {diceValue ? DICE_FACES[diceValue] : "🎲"}
        </div>
        {diceValue && !rolling && (
          <div className="dice-value-label">Sacaste un {diceValue}</div>
        )}
      </div>

      {canRoll && (
        <button className="roll-btn" onClick={onRoll}>
          🎲 Lanzar dado
        </button>
      )}
      {rolling && (
        <button className="roll-btn" disabled>
          Lanzando...
        </button>
      )}

      {/* Evento (serpiente / escalera) */}
      {event && !rolling && (
        <div
          className={`status-msg ${
            event.type === "snake"
              ? "wrong-msg"
              : event.type === "ladder"
              ? "correct-msg"
              : "info-msg"
          }`}
        >
          {event.message}
        </div>
      )}

      {showNext && (
        <button className="next-btn" onClick={onNext}>
          Siguiente turno →
        </button>
      )}
    </div>
  );
};
