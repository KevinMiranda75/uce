// ============================================================
//  PREGUNTAS DEL JUEGO - Aprendizaje Social
//  Agrega, edita o elimina preguntas aquí fácilmente.
//  Cada pregunta tiene:
//    - id: número único
//    - pregunta: texto de la pregunta
//    - opciones: exactamente 4 opciones
//    - respuesta: la letra correcta "A" | "B" | "C" | "D"
//    - categoria (opcional): para agrupar preguntas por tema
// ============================================================

// ============================================================
//  PREGUNTAS DEL JUEGO - Teorías del Aprendizaje
//  Estructurado con 30 preguntas para el tablero de 60 casillas.
// ============================================================

export interface Pregunta {
  id: number;
  pregunta: string;
  opciones: [string, string, string, string]; // [A, B, C, D]
  respuesta: "A" | "B" | "C" | "D";
  categoria?: string;
}

export const PREGUNTAS: Pregunta[] = [
  {
    id: 1,
    pregunta: "¿Qué es la electronegatividad?",
    opciones: [
      "La capacidad de un átomo para atraer electrones en un enlace químico",
      "La capacidad de perder protones",
      "La cantidad de neutrones de un átomo",
      "La masa de un elemento"
    ],
    respuesta: "A",
    categoria: "Electronegatividad"
  },
  {
    id: 2,
    pregunta: "¿Quién propuso la escala de electronegatividad más utilizada?",
    opciones: [
      "Niels Bohr",
      "Linus Pauling",
      "Ernest Rutherford",
      "John Dalton"
    ],
    respuesta: "B",
    categoria: "Electronegatividad"
  },
  {
    id: 3,
    pregunta: "¿En qué unidad se mide la electronegatividad?",
    opciones: [
      "Julios",
      "Voltios",
      "No tiene unidades",
      "Amperios"
    ],
    respuesta: "C",
    categoria: "Electronegatividad"
  },
  {
    id: 4,
    pregunta: "¿Cuál es el elemento más electronegativo de la tabla periódica?",
    opciones: [
      "Oxígeno",
      "Cloro",
      "Flúor",
      "Nitrógeno"
    ],
    respuesta: "C",
    categoria: "Electronegatividad"
  },
  {
    id: 5,
    pregunta: "¿Cuál es el valor aproximado de electronegatividad del flúor en la escala de Pauling?",
    opciones: [
      "2.5",
      "3.0",
      "4.0",
      "1.5"
    ],
    respuesta: "C",
    categoria: "Electronegatividad"
  },
  {
    id: 6,
    pregunta: "¿Cómo aumenta la electronegatividad en un período?",
    opciones: [
      "De derecha a izquierda",
      "De izquierda a derecha",
      "De abajo hacia arriba",
      "No cambia"
    ],
    respuesta: "B",
    categoria: "Electronegatividad"
  },
  {
    id: 7,
    pregunta: "¿Cómo varía la electronegatividad en un grupo?",
    opciones: [
      "Aumenta de arriba hacia abajo",
      "Disminuye de arriba hacia abajo",
      "Permanece constante",
      "Aumenta en el centro"
    ],
    respuesta: "B",
    categoria: "Electronegatividad"
  },
  {
    id: 8,
    pregunta: "¿Qué elemento tiene menor electronegatividad?",
    opciones: [
      "Francio",
      "Flúor",
      "Oxígeno",
      "Cloro"
    ],
    respuesta: "A",
    categoria: "Electronegatividad"
  },
  {
    id: 9,
    pregunta: "¿Qué tipo de enlace se forma cuando la diferencia de electronegatividad es muy grande?",
    opciones: [
      "Metálico",
      "Covalente no polar",
      "Iónico",
      "Puente de hidrógeno"
    ],
    respuesta: "C",
    categoria: "Electronegatividad"
  },
  {
    id: 10,
    pregunta: "Si dos átomos tienen electronegatividad muy similar, el enlace será:",
    opciones: [
      "Iónico",
      "Metálico",
      "Covalente no polar",
      "Radioactivo"
    ],
    respuesta: "C",
    categoria: "Electronegatividad"
  },
  {
    id: 11,
    pregunta: "¿Qué ocurre con los electrones cuando un átomo tiene alta electronegatividad?",
    opciones: [
      "Los pierde fácilmente",
      "Los atrae con mayor fuerza",
      "Los destruye",
      "No interactúa con ellos"
    ],
    respuesta: "B",
    categoria: "Electronegatividad"
  },
  {
    id: 12,
    pregunta: "¿Cuál de estos elementos es más electronegativo?",
    opciones: [
      "Sodio",
      "Cloro",
      "Potasio",
      "Calcio"
    ],
    respuesta: "B",
    categoria: "Electronegatividad"
  },
  {
    id: 13,
    pregunta: "¿Cuál es más electronegativo?",
    opciones: [
      "Oxígeno",
      "Carbono",
      "Aluminio",
      "Magnesio"
    ],
    respuesta: "A",
    categoria: "Electronegatividad"
  },
  {
    id: 14,
    pregunta: "¿Cuál es más electronegativo?",
    opciones: [
      "Litio",
      "Berilio",
      "Boro",
      "Flúor"
    ],
    respuesta: "D",
    categoria: "Electronegatividad"
  },
  {
    id: 15,
    pregunta: "¿Qué propiedad periódica está relacionada con la atracción de electrones compartidos?",
    opciones: [
      "Radio atómico",
      "Electronegatividad",
      "Masa atómica",
      "Número másico"
    ],
    respuesta: "B",
    categoria: "Electronegatividad"
  },
  {
    id: 16,
    pregunta: "¿Qué elemento tiene mayor electronegatividad: Cl o Br?",
    opciones: [
      "Cloro",
      "Bromo",
      "Son iguales",
      "Depende de la temperatura"
    ],
    respuesta: "A",
    categoria: "Electronegatividad"
  },
  {
    id: 17,
    pregunta: "¿Qué elemento tiene mayor electronegatividad: N o P?",
    opciones: [
      "Nitrógeno",
      "Fósforo",
      "Son iguales",
      "Azufre"
    ],
    respuesta: "A",
    categoria: "Electronegatividad"
  },
  {
    id: 18,
    pregunta: "¿Cuál tiene mayor electronegatividad?",
    opciones: [
      "Cesio",
      "Rubidio",
      "Potasio",
      "Litio"
    ],
    respuesta: "D",
    categoria: "Electronegatividad"
  },
  {
    id: 19,
    pregunta: "La electronegatividad es una propiedad:",
    opciones: [
      "Periódica",
      "Nuclear",
      "Biológica",
      "Óptica"
    ],
    respuesta: "A",
    categoria: "Electronegatividad"
  },
  {
    id: 20,
    pregunta: "¿Qué sucede cuando aumenta la electronegatividad?",
    opciones: [
      "Disminuye la atracción por electrones",
      "Aumenta la atracción por electrones",
      "Desaparecen los enlaces",
      "Aumenta el número de protones"
    ],
    respuesta: "B",
    categoria: "Electronegatividad"
  },
  {
    id: 21,
    pregunta: "¿Qué elemento tiene mayor electronegatividad: C o Si?",
    opciones: [
      "Carbono",
      "Silicio",
      "Son iguales",
      "Germanio"
    ],
    respuesta: "A",
    categoria: "Electronegatividad"
  },
  {
    id: 22,
    pregunta: "¿Cuál de estos metales posee mayor electronegatividad?",
    opciones: [
      "Sodio",
      "Potasio",
      "Cesio",
      "Litio"
    ],
    respuesta: "D",
    categoria: "Electronegatividad"
  },
  {
    id: 23,
    pregunta: "¿Qué grupo contiene los elementos más electronegativos?",
    opciones: [
      "Metales alcalinos",
      "Halógenos",
      "Gases nobles",
      "Lantánidos"
    ],
    respuesta: "B",
    categoria: "Electronegatividad"
  },
  {
    id: 24,
    pregunta: "¿Cuál es más electronegativo?",
    opciones: [
      "Azufre",
      "Oxígeno",
      "Selenio",
      "Telurio"
    ],
    respuesta: "B",
    categoria: "Electronegatividad"
  },
  {
    id: 25,
    pregunta: "¿Qué propiedad disminuye cuando aumenta el radio atómico?",
    opciones: [
      "Electronegatividad",
      "Masa atómica",
      "Número atómico",
      "Densidad"
    ],
    respuesta: "A",
    categoria: "Electronegatividad"
  },
  {
    id: 26,
    pregunta: "¿Cuál es más electronegativo?",
    opciones: [
      "Bromo",
      "Yodo",
      "Cloro",
      "Astato"
    ],
    respuesta: "C",
    categoria: "Electronegatividad"
  },
  {
    id: 27,
    pregunta: "¿Qué enlace suele presentar una diferencia intermedia de electronegatividad?",
    opciones: [
      "Covalente polar",
      "Metálico",
      "Iónico puro",
      "Ninguno"
    ],
    respuesta: "A",
    categoria: "Electronegatividad"
  },
  {
    id: 28,
    pregunta: "¿Qué elemento es más electronegativo?",
    opciones: [
      "Hidrógeno",
      "Carbono",
      "Oxígeno",
      "Sodio"
    ],
    respuesta: "C",
    categoria: "Electronegatividad"
  },
  {
    id: 29,
    pregunta: "¿Qué ocurre con la polaridad cuando aumenta la diferencia de electronegatividad?",
    opciones: [
      "Disminuye",
      "Aumenta",
      "Desaparece",
      "No cambia"
    ],
    respuesta: "B",
    categoria: "Electronegatividad"
  },
  {
    id: 30,
    pregunta: "¿Para qué sirve principalmente la electronegatividad?",
    opciones: [
      "Determinar la masa de un átomo",
      "Predecir el comportamiento de los enlaces químicos",
      "Calcular el número de protones",
      "Determinar el estado físico"
    ],
    respuesta: "B",
    categoria: "Electronegatividad"
  }
];