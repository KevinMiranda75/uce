import React from "react";
import { Player } from "./useGameLogic";

interface WinnerScreenProps {
  winner: Player;
  players: Player[];
  onPlayAgain: () => void;
}

export const WinnerScreen: React.FC<WinnerScreenProps> = ({
  winner,
  players,
  onPlayAgain,
}) => {
  return (
    <div className="winner-overlay">
      <div className="winner-card">
        <div className="winner-confetti">🎉🏆🎊</div>
        <div
          className="winner-avatar"
          style={{ background: winner.color }}
        >
          {winner.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="winner-title">¡{winner.name} ganó!</h2>
        <p className="winner-sub">
          {winner.type === "ai"
            ? "🤖 La inteligencia artificial llegó primero a la casilla 100."
            : "👤 ¡Felicitaciones! Llegaste primero a la casilla 100."}
        </p>

        {/* Posiciones finales */}
        <div className="final-positions">
          {players
            .slice()
            .sort((a, b) => b.position - a.position)
            .map((p, rank) => (
              <div key={p.id} className="final-row">
                <span className="final-rank">
                  {rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : `${rank + 1}°`}
                </span>
                <div
                  className="final-dot"
                  style={{ background: p.color }}
                />
                <span className="final-name">{p.name}</span>
                <span className="final-pos">Casilla {p.position}</span>
              </div>
            ))}
        </div>

        <button className="start-btn" onClick={onPlayAgain}>
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
};
