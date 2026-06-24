import React, { useMemo } from "react";
import { SERPIENTES, ESCALERAS } from "./constants";
import { Player } from "./useGameLogic";

// ─── Paleta de colores del tablero ───────────────────────────
const CELL_COLORS = [
  "#fef9c3", "#fde68a", "#bbf7d0", "#a5f3fc",
  "#ddd6fe", "#fca5a5", "#86efac", "#93c5fd",
  "#f9a8d4", "#c4b5fd",
];

// function cellNumber(row: number, col: number): number {
//   // row 0 = fila superior (casillas 91-100), row 9 = fila inferior (1-10)
//   // Las filas pares van de izq→der, impares de der→izq
//   const boardRow = 9 - row; // 0=bottom, 9=top
//   if (boardRow % 2 === 0) {
//     return boardRow * 10 + col + 1;
//   } else {
//     return boardRow * 10 + (10 - col);
//   }
// }

// function cellPosition(num: number): { row: number; col: number } {
//   const boardRow = Math.floor((num - 1) / 10);
//   const col =
//     boardRow % 2 === 0
//       ? (num - 1) % 10
//       : 9 - ((num - 1) % 10);
//   const row = 9 - boardRow;
//   return { row, col };
// }


function cellNumber(row: number, col: number): number {
  // row 0 = fila superior (casillas 51-60), row 5 = fila inferior (1-10)
  // Las filas pares van de izq→der, impares de der→izq
  const boardRow = 5 - row; // 0=bottom, 5=top (Antes era 9 - row)
  if (boardRow % 2 === 0) {
    return boardRow * 10 + col + 1;
  } else {
    return boardRow * 10 + (10 - col);
  }
}

function cellPosition(num: number): { row: number; col: number } {
  const boardRow = Math.floor((num - 1) / 10);
  const col =
    boardRow % 2 === 0
      ? (num - 1) % 10
      : 9 - ((num - 1) % 10);
  const row = 5 - boardRow; // Antes era 9 - boardRow
  return { row, col };
}

// Centro de una casilla en SVG coords (el SVG es 500x500, 10x10 celdas de 50px)
function cellCenter(num: number): { x: number; y: number } {
  const { row, col } = cellPosition(num);
  return { x: col * 50 + 25, y: row * 50 + 25 };
}

interface BoardProps {
  players: Player[];
}

export const Board: React.FC<BoardProps> = ({ players }) => {
  // const cells = useMemo(() => {
  //   const arr: { num: number; row: number; col: number }[] = [];
  //   for (let r = 0; r < 10; r++) {
  //     for (let c = 0; c < 10; c++) {
  //       arr.push({ num: cellNumber(r, c), row: r, col: c });
  //     }
  //   }
  //   return arr;
  // }, []);


  const cells = useMemo(() => {
    const arr: { num: number; row: number; col: number }[] = [];
    for (let r = 0; r < 6; r++) { // Cambiado de r < 10 a r < 6
      for (let c = 0; c < 10; c++) {
        arr.push({ num: cellNumber(r, c), row: r, col: c });
      }
    }
    return arr;
  }, []);

  // Jugadores por casilla
  const playersByCell: Record<number, Player[]> = {};
  players.forEach((p) => {
    if (!playersByCell[p.position]) playersByCell[p.position] = [];
    playersByCell[p.position].push(p);
  });

  return (
    <div className="board-container">
      <svg
        viewBox="0 0 500 300"
        width="100%"
        style={{ display: "block", borderRadius: 12, border: "2px solid #e2e8f0" }}
      >
        {/* ── Celdas ── */}
        {cells.map(({ num, row, col }) => {
          const x = col * 50;
          const y = row * 50;
          const isSnakeHead = SERPIENTES[num] !== undefined;
          const isLadderBase = ESCALERAS[num] !== undefined;
          const isSnakeTail = Object.values(SERPIENTES).includes(num);
          const isLadderTop = Object.values(ESCALERAS).includes(num);

          let fill = CELL_COLORS[(row + col) % CELL_COLORS.length];
          if (isSnakeHead) fill = "#fecaca";
          if (isLadderBase) fill = "#bbf7d0";
          if (num === 100) fill = "#fef08a";
          if (num === 1) fill = "#e0e7ff";

          return (
            <g key={num}>
              <rect
                x={x}
                y={y}
                width={50}
                height={50}
                fill={fill}
                stroke="#cbd5e1"
                strokeWidth={0.5}
              />
              {/* Número de casilla */}
              <text
                x={x + 4}
                y={y + 13}
                fontSize={9}
                fill="#64748b"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
              >
                {num}
              </text>
              {/* Íconos especiales */}
              {isSnakeHead && (
                <text x={x + 28} y={y + 38} fontSize={18} textAnchor="middle">
                  🐍
                </text>
              )}
              {isLadderBase && (
                <text x={x + 28} y={y + 38} fontSize={18} textAnchor="middle">
                  🪜
                </text>
              )}
              {isSnakeTail && !isSnakeHead && (
                <text x={x + 28} y={y + 38} fontSize={12} textAnchor="middle">
                  💀
                </text>
              )}
              {isLadderTop && !isLadderBase && (
                <text x={x + 28} y={y + 38} fontSize={12} textAnchor="middle">
                  ⭐
                </text>
              )}
              {num === 100 && (
                <text x={x + 25} y={y + 38} fontSize={18} textAnchor="middle">
                  🏆
                </text>
              )}
              {num === 1 && (
                <text x={x + 25} y={y + 38} fontSize={14} textAnchor="middle">
                  🚀
                </text>
              )}
            </g>
          );
        })}

        {/* ── Escaleras (líneas gruesas verdes con gradiente) ── */}
        {/* <defs>
          <marker id="arrow-ladder" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#16a34a" />
          </marker>
          <marker id="arrow-snake" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#dc2626" />
          </marker>
        </defs> */}

        {/* ── Escaleras (Diseño de Madera Café Personalizado) ── */}
        {Object.entries(ESCALERAS).map(([from, to]) => {
          const f = cellCenter(Number(from));
          const t = cellCenter(Number(to));
          // Control point para curva suave
          const cx = (f.x + t.x) / 2 - 15;
          const cy = (f.y + t.y) / 2;
          return (
            <g key={`ladder-${from}-${to}`}>
              {/* Sombra de fondo */}
              <path
                d={`M${f.x},${f.y} Q${cx},${cy} ${t.x},${t.y}`}
                stroke="#88584E"
                strokeWidth={12}
                strokeOpacity={0.15}
                fill="none"
              />
              {/* PELDAÑOS (Línea café gruesa y segmentada) */}
              <path
                d={`M${f.x},${f.y} Q${cx},${cy} ${t.x},${t.y}`}
                stroke="#88584E" /* Tu color café */
                strokeWidth={10}
                strokeDasharray="2,6" /* Esto crea los escalones horizontales */
                fill="none"
              />
              {/* Riel Izquierdo de la escalera */}
              <path
                d={`M${f.x - 5},${f.y} Q${cx - 5},${cy} ${t.x - 5},${t.y}`}
                stroke="#88584E" /* Tu color café */
                strokeWidth={2}
                fill="none"
              />
              {/* Riel Derecho de la escalera */}
              <path
                d={`M${f.x + 5},${f.y} Q${cx + 5},${cy} ${t.x + 5},${t.y}`}
                stroke="#88584E" /* Tu color café */
                strokeWidth={2}
                fill="none"
              />
            </g>
          );
        })}

        {/* ── Serpientes (Diseño Orgánico y Ondulado con Cabeza) ── */}
        {Object.entries(SERPIENTES).map(([from, to]) => {
          const f = cellCenter(Number(from)); // cabeza
          const t = cellCenter(Number(to));   // cola
          const cx1 = f.x + 30;
          const cy1 = (f.y + t.y) / 2 - 20;
          const cx2 = t.x - 30;
          const cy2 = (f.y + t.y) / 2 + 20;
          return (
            <g key={`snake-${from}-${to}`}>
              {/* Sombra del cuerpo */}
              <path
                d={`M${f.x},${f.y} C${cx1},${cy1} ${cx2},${cy2} ${t.x},${t.y}`}
                stroke="#dc2626"
                strokeWidth={14}
                strokeOpacity={0.12}
                fill="none"
              />

              {/* Cuerpo principal (Grueso y de bordes redondeados) */}
              <path
                d={`M${f.x},${f.y} C${cx1},${cy1} ${cx2},${cy2} ${t.x},${t.y}`}
                stroke="#dc2626" /* Rojo base */
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
              />

              {/* Patrón de anillos en el lomo */}
              <path
                d={`M${f.x},${f.y} C${cx1},${cy1} ${cx2},${cy2} ${t.x},${t.y}`}
                stroke="#fef08a" /* Amarillo clarito */
                strokeWidth={8}
                strokeDasharray="4,12"
                strokeLinecap="round"
                fill="none"
                opacity={0.7}
              />

              {/* ── CABEZA DE LA SERPIENTE (Dibujada justo en f.x, f.y) ── */}
              <g>
                {/* Base roja de la cabeza (un círculo ligeramente más ancho que el cuerpo) */}
                <circle cx={f.x} cy={f.y} r={8} fill="#dc2626" />

                {/* Ojo Izquierdo */}
                <circle cx={f.x - 3} cy={f.y - 2} r={1.5} fill="#fff" />
                <circle cx={f.x - 3} cy={f.y - 2} r={0.7} fill="#000" />

                {/* Ojo Derecho */}
                <circle cx={f.x + 3} cy={f.y - 2} r={1.5} fill="#fff" />
                <circle cx={f.x + 3} cy={f.y - 2} r={0.7} fill="#000" />
              </g>
            </g>
          );
        })}

        {/* ── Peones de los jugadores ── */}
        {players.map((player, pi) => {
          if (player.position === 0) return null;
          const { x, y } = cellCenter(player.position);
          const playersHere = playersByCell[player.position] || [];
          const idx = playersHere.findIndex((p) => p.id === player.id);
          const total = playersHere.length;
          // Distribuir peones si hay varios en la misma casilla
          const offsetX = total > 1 ? (idx - (total - 1) / 2) * 12 : 0;
          const offsetY = total > 2 ? (idx < 2 ? -6 : 6) : 0;

          return (
            <g key={player.id}>
              {/* Sombra del peón */}
              <ellipse
                cx={x + offsetX}
                cy={y + offsetY + 10}
                rx={8}
                ry={3}
                fill="rgba(0,0,0,0.2)"
              />
              {/* Cuerpo */}
              <circle
                cx={x + offsetX}
                cy={y + offsetY}
                r={10}
                fill={player.color}
                stroke="#fff"
                strokeWidth={2}
              />
              {/* Número/inicial */}
              <text
                x={x + offsetX}
                y={y + offsetY + 4}
                textAnchor="middle"
                fontSize={10}
                fontWeight="700"
                fill="#fff"
                fontFamily="system-ui, sans-serif"
              >
                {pi + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
