// ============================================================
//  CONFIGURACIÓN DEL TABLERO
// ============================================================

export const PLAYER_COLORS = [
  { bg: "#6366f1", light: "#e0e7ff", text: "#fff", name: "Índigo" },
  { bg: "#ef4444", light: "#fee2e2", text: "#fff", name: "Rojo" },
  { bg: "#10b981", light: "#d1fae5", text: "#fff", name: "Verde" },
  { bg: "#f59e0b", light: "#fef3c7", text: "#fff", name: "Ámbar" },
];

// Serpientes: cae en KEY → baja a VALUE
// Formato: { casilla_cabeza: casilla_cola }
export const SERPIENTES: Record<number, number> = {
  // 99: 21,
  // 87: 24,
  // 74: 53,
  // 62: 19,
  59: 43,
  49: 29,
  38: 23,
  27: 13,

  16: 4,
};

// Escaleras: pisa KEY → sube a VALUE
// Formato: { casilla_base: casilla_tope }
export const ESCALERAS: Record<number, number> = {
  3: 24,
  7: 14,
  9: 30,
  19: 39,
  15: 26,
  21: 41,
  28: 53,
  31: 51,


  34: 47,
  37: 57,
  35: 55,
  45: 56,


  // 51: 67,
  // 71: 91,
  // 78: 98,
};

export const GEMINI_KEY = "AIzaSyCnECC6sgWcMcir-vyEec";
export const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

export const DICE_FACES = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
