import React, { useState } from "react";
import { Player, PlayerType } from "./useGameLogic";
import { PLAYER_COLORS } from "./constants";

interface SetupScreenProps {
  onStart: (players: Player[]) => void;
}

interface PlayerConfig {
  name: string;
  type: PlayerType;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerConfigs, setPlayerConfigs] = useState<PlayerConfig[]>([
    { name: "Jugador 1", type: "human" },
    { name: "Jugador 2", type: "ai" },
    { name: "Jugador 3", type: "human" },
    { name: "Jugador 4", type: "human" },
  ]);

  const updateName = (i: number, name: string) => {
    setPlayerConfigs((prev) => prev.map((p, idx) => (idx === i ? { ...p, name } : p)));
  };

  const updateType = (i: number, type: PlayerType) => {
    setPlayerConfigs((prev) => prev.map((p, idx) => (idx === i ? { ...p, type } : p)));
  };

  const handleStart = () => {
    const players: Player[] = playerConfigs.slice(0, numPlayers).map((cfg, i) => ({
      id: i,
      name: cfg.name || `Jugador ${i + 1}`,
      type: cfg.type,
      color: PLAYER_COLORS[i].bg,
      colorLight: PLAYER_COLORS[i].light,
      colorText: PLAYER_COLORS[i].text,
      position: 0,
    }));
    onStart(players);
  };

  return (
    <div className="setup-wrapper">
      {/* Hero */}
      <div className="setup-hero">
        <div className="setup-hero-icon">🐍🪜</div>
        <h1 className="setup-title">Serpientes y Escaleras</h1>
        <p className="setup-subtitle">
          Aprendizaje Social · Responde correctamente para avanzar
        </p>
      </div>

      <div className="setup-card">
        {/* Número de jugadores */}
        <div className="setup-section">
          <label className="setup-label">¿Cuántos jugadores?</label>
          <div className="num-btns">
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                className={`num-btn ${numPlayers === n ? "active" : ""}`}
                onClick={() => setNumPlayers(n)}
              >
                {n} jugadores
              </button>
            ))}
          </div>
        </div>

        {/* Configuración de jugadores */}
        <div className="setup-section">
          <label className="setup-label">Configura cada jugador</label>
          <div className="players-list">
            {playerConfigs.slice(0, numPlayers).map((p, i) => (
              <div key={i} className="player-config-row">
                <div
                  className="player-color-badge"
                  style={{ background: PLAYER_COLORS[i].bg }}
                >
                  {i + 1}
                </div>
                <input
                  className="player-name-input"
                  value={p.name}
                  onChange={(e) => updateName(i, e.target.value)}
                  placeholder={`Jugador ${i + 1}`}
                />
                <div className="type-toggle">
                  <button
                    className={`type-btn ${p.type === "human" ? "active-human" : ""}`}
                    onClick={() => updateType(i, "human")}
                  >
                    👤 Humano
                  </button>
                  <button
                    className={`type-btn ${p.type === "ai" ? "active-ai" : ""}`}
                    onClick={() => updateType(i, "ai")}
                  >
                    🤖 IA
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="setup-legend">
          <div className="legend-item">
            <span className="legend-dot snake-dot" /> Serpiente → baja
          </div>
          <div className="legend-item">
            <span className="legend-dot ladder-dot" /> Escalera → sube
          </div>
          <div className="legend-item">
            <span>🤖 IA usa Gemini 2.0</span>
          </div>
        </div>

        <button className="start-btn" onClick={handleStart}>
          ¡Iniciar juego!
        </button>
      </div>
    </div>
  );
};
