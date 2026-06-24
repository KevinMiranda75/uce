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
  // ── TEMA: Conductismo (Preguntas 1-6) ──────────────────────────────
  {
    id: 1,
    pregunta: "¿Cuál es el foco principal de estudio en la teoría conductista?",
    opciones: [
      "Los procesos mentales inconscientes",
      "La conducta observable y medible",
      "Las estructuras cognitivas internas",
      "Las interacciones sociales del individuo"
    ],
    respuesta: "B",
    categoria: "Conductismo"
  },
  {
    id: 2,
    pregunta: "En el conductismo, ¿qué es un 'refuerzo positivo'?",
    opciones: [
      "Retirar un estímulo agradable para disminuir una conducta",
      "Aplicar un castigo físico inmediato",
      "Presentar un estímulo agradable para aumentar la probabilidad de una conducta",
      "Ignorar al estudiante hasta que actúe correctamente"
    ],
    respuesta: "C",
    categoria: "Conductismo"
  },
  {
    id: 3,
    pregunta: "¿Quién es considerado el padre del condicionamiento clásico?",
    opciones: [
      "Ivan Pavlov",
      "Jean Piaget",
      "Lev Vygotsky",
      "Albert Bandura"
    ],
    respuesta: "A",
    categoria: "Conductismo"
  },
  {
    id: 4,
    pregunta: "Si un profesor premia con una estrella a los alumnos que terminan rápido la tarea, ¿qué técnica aplica?",
    opciones: [
      "Modelamiento social",
      "Condicionamiento operante",
      "Andamiaje cognitivo",
      "Asimilación conceptual"
    ],
    respuesta: "B",
    categoria: "Conductismo"
  },
  {
    id: 5,
    pregunta: "¿Cómo concibe el conductismo radical al estudiante en sus inicios?",
    opciones: [
      "Como un procesador activo de información",
      "Como un científico que experimenta en su entorno",
      "Como una 'tabla rasa' que reacciona a estímulos externos",
      "Como un ser puramente guiado por la intuición"
    ],
    respuesta: "C",
    categoria: "Conductismo"
  },
  {
    id: 6,
    pregunta: "¿Qué autor desarrolló la caja de condicionamiento operante para estudiar el refuerzo y el castigo?",
    opciones: [
      "B.F. Skinner",
      "David Ausubel",
      "Jerome Bruner",
      "John Dewey"
    ],
    respuesta: "A",
    categoria: "Conductismo"
  },

  // ── TEMA: Cognitivismo (Preguntas 7-12) ──────────────────────────────
  {
    id: 7,
    pregunta: "¿Cuál es la metáfora principal que utiliza el cognitivismo para explicar la mente humana?",
    opciones: [
      "Una hoja en blanco",
      "Una computadora que procesa información",
      "Un espejo que refleja la sociedad",
      "Un músculo que requiere fuerza física"
    ],
    respuesta: "B",
    categoria: "Cognitivismo"
  },
  {
    id: 8,
    pregunta: "Según Jean Piaget, ¿qué ocurre en el proceso de 'acomodación'?",
    opciones: [
      "Se rechaza la información nueva por ser muy compleja",
      "Se modifican los esquemas mentales existentes para incorporar nueva información",
      "Se memorizan datos de forma repetitiva sin comprenderlos",
      "Se imita mecánicamente la conducta de un adulto"
    ],
    respuesta: "B",
    categoria: "Cognitivismo"
  },
  {
    id: 9,
    pregunta: "¿Qué área de estudio es prioritaria para los psicólogos cognitivistas?",
    opciones: [
      "Las respuestas biológicas reflejas",
      "Los procesos de memoria, atención y resolución de problemas",
      "Las dinámicas de recompensa económica",
      "El desarrollo físico y motor exclusivamente"
    ],
    respuesta: "B",
    categoria: "Cognitivismo"
  },
  {
    id: 10,
    pregunta: "En la teoría cognitiva, ¿qué estructura nos permite organizar y categorizar el conocimiento?",
    opciones: [
      "Los estímulos incondicionados",
      "Los esquemas mentales",
      "Los refuerzos secundarios",
      "Las neuronas espejo"
    ],
    respuesta: "B",
    categoria: "Cognitivismo"
  },
  {
    id: 11,
    pregunta: "¿A qué fase del desarrollo cognitivo de Piaget corresponde el pensamiento abstracto y lógico complejo?",
    opciones: [
      "Etapa sensorio-motora",
      "Etapa preoperacional",
      "Etapa de operaciones concretas",
      "Etapa de operaciones formales"
    ],
    respuesta: "D",
    categoria: "Cognitivismo"
  },
  {
    id: 12,
    pregunta: "¿Qué tipo de memoria retiene la información por unos pocos segundos antes de archivarla o desecharla?",
    opciones: [
      "Memoria a corto plazo o de trabajo",
      "Memoria a largo plazo",
      "Memoria episódica",
      "Memoria procedimental"
    ],
    respuesta: "A",
    categoria: "Cognitivismo"
  },

  // ── TEMA: Constructivismo (Preguntas 13-18) ──────────────────────────────
  {
    id: 13,
    pregunta: "¿Cuál es el postulado básico del Constructivismo?",
    opciones: [
      "El conocimiento se transfiere directamente del profesor al alumno",
      "El aprendizaje ocurre solo mediante premios y castigos repetitivos",
      "El estudiante construye activamente su propio conocimiento",
      "La genética determina al 100% lo que una persona puede aprender"
    ],
    respuesta: "C",
    categoria: "Constructivismo"
  },
  {
    id: 14,
    pregunta: "Según Vygotsky, ¿qué es la Zona de Desarrollo Próximo (ZDP)?",
    opciones: [
      "El límite máximo que una persona puede aprender de forma aislada",
      "La distancia entre lo que el alumno hace solo y lo que puede hacer con ayuda",
      "El espacio físico idóneo dentro de un salón de clases",
      "El periodo biológico donde el cerebro está maduro"
    ],
    respuesta: "B",
    categoria: "Constructivismo"
  },
  {
    id: 15,
    pregunta: "¿Qué concepto describe el apoyo temporal que da un adulto o par experto para que el alumno logre una tarea?",
    opciones: [
      "Andamiaje",
      "Condicionamiento",
      "Refuerzo intermitente",
      "Procesamiento serial"
    ],
    respuesta: "A",
    categoria: "Constructivismo"
  },
  {
    id: 16,
    pregunta: "¿Cuál es el rol del docente bajo un enfoque netamente constructivista?",
    opciones: [
      "Ser un transmisor único y absoluto de verdades",
      "Ser un evaluador estricto basado solo en exámenes escritos",
      "Ser un facilitador y guía del proceso de aprendizaje",
      "Ser un espectador pasivo que no interviene en el aula"
    ],
    respuesta: "C",
    categoria: "Constructivismo"
  },
  {
    id: 17,
    pregunta: "¿Qué autor propuso el 'Aprendizaje por Descubrimiento', pilar del constructivismo?",
    opciones: [
      "Jerome Bruner",
      "B.F. Skinner",
      "John Watson",
      "Ivan Pavlov"
    ],
    respuesta: "A",
    categoria: "Constructivismo"
  },
  {
    id: 18,
    pregunta: "Al diseñar un proyecto escolar donde los alumnos resuelven un problema real de su entorno, aplicamos:",
    opciones: [
      "Estrategias conductistas tradicionales",
      "Constructivismo social y situado",
      "Condicionamiento de respuestas automáticas",
      "Métodos de memorización lineal de datos"
    ],
    respuesta: "B",
    categoria: "Constructivismo"
  },

  // ── TEMA: Aprendizaje Significativo (Preguntas 19-24) ──────────────────────────────
  {
    id: 19,
    pregunta: "¿Quién es el principal teórico del Aprendizaje Significativo?",
    opciones: [
      "Albert Bandura",
      "David Ausubel",
      "Jean Piaget",
      "Lev Vygotsky"
    ],
    respuesta: "B",
    categoria: "Aprendizaje Significativo"
  },
  {
    id: 20,
    pregunta: "¿Cuál es el requisito indispensable para que un aprendizaje sea realmente significativo?",
    opciones: [
      "Que el alumno repita el concepto textualmente diez veces",
      "Que la información nueva se conecte de forma lógica con los conocimientos previos",
      "Que el contenido se evalúe mediante una prueba de opción múltiple",
      "Que se implementen castigos ante los errores cometidos"
    ],
    respuesta: "B",
    categoria: "Aprendizaje Significativo"
  },
  {
    id: 21,
    pregunta: "¿Cómo llama Ausubel a los conceptos o ideas previas que sirven de anclaje para la nueva información?",
    opciones: [
      "Estímulos neutros",
      "Incentivos sociales",
      "Inclusores o ideas de anclaje",
      "Modelos de imitación"
    ],
    respuesta: "C",
    categoria: "Aprendizaje Significativo"
  },
  {
    id: 22,
    pregunta: "¿Qué herramienta pedagógica sirve como puente cognitivo entre lo que el alumno ya sabe y lo que va a aprender?",
    opciones: [
      "El organizador previo",
      "La lista de calificaciones final",
      "El reporte de mala conducta",
      "La repetición memorística"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Significativo"
  },
  {
    id: 23,
    pregunta: "¿Qué ocurre si un contenido carece de significado lógico y el alumno no tiene conceptos previos relacionados?",
    opciones: [
      "Un aprendizaje significativo por recepción",
      "Un aprendizaje mecánico o memorístico",
      "Un andamiaje exitoso",
      "Un condicionamiento operante efectivo"
    ],
    respuesta: "B",
    categoria: "Aprendizaje Significativo"
  },
  {
    id: 24,
    pregunta: "Si un estudiante asocia el ciclo del agua con el funcionamiento de una tetera hirviendo en su casa, experimenta:",
    opciones: [
      "Aprendizaje Significativo",
      "Condicionamiento Clásico",
      "Castigo Positivo",
      "Desarrollo Biológico Puro"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Significativo"
  },

  // ── TEMA: Aprendizaje Social (Preguntas 25-30) ──────────────────────────────
  {
    id: 25,
    pregunta: "¿Qué psicólogo propuso la Teoría del Aprendizaje Social (cognitivo-social)?",
    opciones: [
      "Albert Bandura",
      "B.F. Skinner",
      "David Ausubel",
      "Jean Piaget"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },
  {
    id: 26,
    pregunta: "¿Qué nombre recibe el aprendizaje que se obtiene al observar las conductas de otras personas y sus consecuencias?",
    opciones: [
      "Aprendizaje memorístico",
      "Aprendizaje vicario o por observación",
      "Condicionamiento instrumental",
      "Asimilación biológica"
    ],
    respuesta: "B",
    categoria: "Aprendizaje Social"
  },
  {
    id: 27,
    pregunta: "¿Cómo se le denomina a la persona cuya conducta es observada e imitada por otros en el aprendizaje social?",
    opciones: [
      "Refuerzo",
      "Modelo",
      "Estímulo",
      "Sujeto pasivo"
    ],
    respuesta: "B",
    categoria: "Aprendizaje Social"
  },
  {
    id: 28,
    pregunta: "¿Cuál fue el famoso experimento de Albert Bandura enfocado en la agresión imitada en niños?",
    opciones: [
      "El experimento de los perros de Pavlov",
      "El experimento del Muñeco Bobo",
      "La caja de Skinner con palomas",
      "Los dilemas morales de Kohlberg"
    ],
    respuesta: "B",
    categoria: "Aprendizaje Social"
  },
  {
    id: 29,
    pregunta: "¿Cuál de las siguientes opciones describe el orden correcto de los 4 procesos del aprendizaje por observación?",
    opciones: [
      "Atención, Retención, Reproducción y Motivación",
      "Motivación, Castigo, Estímulo y Respuesta",
      "Memoria, Olvido, Repetición y Éxito",
      "Andamiaje, Crisis, Equilibrio y Acomodación"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },
  {
    id: 30,
    pregunta: "¿Qué es la 'autoeficacia' según la teoría del aprendizaje social?",
    opciones: [
      "La capacidad de hacer tareas sin ayuda de nadie",
      "La creencia de una persona en su propia capacidad para tener éxito en una situación",
      "El premio que da la sociedad al estudiante destacado",
      "La obediencia absoluta a las normas del salón de clases"
    ],
    respuesta: "B",
    categoria: "Aprendizaje Social"
  },
  // ── PREGUNTAS EXTRA (31-40) ──────────────────────────────

  {
    id: 31,
    pregunta: "¿Qué autor fue uno de los principales representantes del conductismo y estudió la relación entre estímulo y respuesta?",
    opciones: [
      "John B. Watson",
      "David Ausubel",
      "Jerome Bruner",
      "Albert Bandura"
    ],
    respuesta: "A",
    categoria: "Conductismo"
  },
  {
    id: 32,
    pregunta: "En el conductismo, ¿qué ocurre cuando una conducta disminuye debido a una consecuencia negativa?",
    opciones: [
      "Se produce un castigo o reducción de la conducta",
      "Se genera aprendizaje significativo",
      "Se crea un esquema mental nuevo",
      "Ocurre aprendizaje por observación"
    ],
    respuesta: "A",
    categoria: "Conductismo"
  },

  {
    id: 33,
    pregunta: "¿Qué proceso cognitivo permite almacenar, recuperar y utilizar información aprendida?",
    opciones: [
      "La memoria",
      "El castigo",
      "El condicionamiento",
      "El refuerzo"
    ],
    respuesta: "A",
    categoria: "Cognitivismo"
  },
  {
    id: 34,
    pregunta: "Según Piaget, el aprendizaje ocurre principalmente mediante los procesos de:",
    opciones: [
      "Imitación y repetición",
      "Asimilación y acomodación",
      "Premios y castigos",
      "Observación y recompensa"
    ],
    respuesta: "B",
    categoria: "Cognitivismo"
  },

  {
    id: 35,
    pregunta: "¿Qué característica diferencia al constructivismo de otras teorías del aprendizaje?",
    opciones: [
      "El estudiante participa activamente en la construcción del conocimiento",
      "El profesor controla todo el aprendizaje",
      "El aprendizaje depende únicamente de premios",
      "La memoria es el único proceso importante"
    ],
    respuesta: "A",
    categoria: "Constructivismo"
  },
  {
    id: 36,
    pregunta: "¿Qué importancia tiene la interacción social según Vygotsky?",
    opciones: [
      "No influye en el aprendizaje",
      "Ayuda al desarrollo del conocimiento mediante la colaboración",
      "Solo sirve para evaluar estudiantes",
      "Reemplaza completamente al pensamiento individual"
    ],
    respuesta: "B",
    categoria: "Constructivismo"
  },

  {
    id: 37,
    pregunta: "¿Cuál es la diferencia principal entre aprendizaje significativo y aprendizaje memorístico?",
    opciones: [
      "El significativo relaciona conocimientos nuevos con experiencias previas",
      "El memorístico siempre produce mayor comprensión",
      "El significativo solo usa repetición",
      "El memorístico requiere análisis profundo"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Significativo"
  },
  {
    id: 38,
    pregunta: "Según Ausubel, el aprendizaje será más efectivo cuando:",
    opciones: [
      "El estudiante relaciona la nueva información con lo que ya conoce",
      "Solo memoriza sin comprender",
      "Evita relacionar conceptos",
      "Aprende únicamente mediante castigos"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Significativo"
  },

  {
    id: 39,
    pregunta: "Según Bandura, una persona puede aprender una conducta sin realizarla directamente mediante:",
    opciones: [
      "La observación de modelos",
      "El castigo físico",
      "La repetición mecánica solamente",
      "La eliminación de estímulos"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },
  {
    id: 40,
    pregunta: "¿Qué papel tienen los modelos dentro del aprendizaje social?",
    opciones: [
      "Sirven como ejemplos que pueden influir en la conducta de otros",
      "No tienen influencia en el aprendizaje",
      "Solo transmiten información escrita",
      "Eliminan la capacidad de decisión del individuo"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },
];

export const PREGUNTAS2: Pregunta[] = [

  {
    id: 1,
    pregunta: "¿Quién creó la Teoría del Aprendizaje Social?",
    opciones: [
      "Albert Bandura",
      "Jean Piaget",
      "B.F. Skinner",
      "David Ausubel"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 2,
    pregunta: "¿Cuál es la idea principal de la teoría del aprendizaje social?",
    opciones: [
      "Las personas aprenden únicamente mediante castigos",
      "El aprendizaje ocurre observando e imitando a otros",
      "El aprendizaje depende solo de la memoria",
      "La conducta no cambia con el ambiente"
    ],
    respuesta: "B",
    categoria: "Aprendizaje Social"
  },

  {
    id: 3,
    pregunta: "¿Cómo se llama el aprendizaje que ocurre al observar la conducta de otras personas?",
    opciones: [
      "Aprendizaje significativo",
      "Aprendizaje vicario",
      "Aprendizaje mecánico",
      "Aprendizaje biológico"
    ],
    respuesta: "B",
    categoria: "Aprendizaje Social"
  },

  {
    id: 4,
    pregunta: "¿Qué experimento realizó Albert Bandura para estudiar la imitación?",
    opciones: [
      "Experimento de la caja de Skinner",
      "Experimento del Muñeco Bobo",
      "Experimento de los perros",
      "Experimento de memoria"
    ],
    respuesta: "B",
    categoria: "Aprendizaje Social"
  },

  {
    id: 5,
    pregunta: "En el aprendizaje social, una persona que sirve como ejemplo de conducta se llama:",
    opciones: [
      "Modelo",
      "Estímulo",
      "Refuerzo",
      "Respuesta"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 6,
    pregunta: "¿Cuál es el primer proceso necesario para aprender mediante observación?",
    opciones: [
      "Motivación",
      "Atención",
      "Reproducción",
      "Castigo"
    ],
    respuesta: "B",
    categoria: "Aprendizaje Social"
  },

  {
    id: 7,
    pregunta: "Según Bandura, ¿cuáles son los cuatro procesos del aprendizaje observacional?",
    opciones: [
      "Atención, retención, reproducción y motivación",
      "Memoria, castigo, estímulo y respuesta",
      "Imitación, premio, error y repetición",
      "Sensación, emoción, acción y resultado"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 8,
    pregunta: "¿Qué significa retención en el aprendizaje social?",
    opciones: [
      "Recordar la conducta observada",
      "Eliminar una conducta",
      "Recibir un premio",
      "Evitar aprender"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 9,
    pregunta: "La capacidad de creer que uno puede lograr una tarea se llama:",
    opciones: [
      "Autoeficacia",
      "Condicionamiento",
      "Acomodación",
      "Asimilación"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 10,
    pregunta: "Según Bandura, el aprendizaje depende de la interacción entre:",
    opciones: [
      "Persona, conducta y ambiente",
      "Memoria y castigo",
      "Profesor y examen",
      "Genética únicamente"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 11,
    pregunta: "¿Qué papel tiene el ambiente en la teoría de Bandura?",
    opciones: [
      "Influye en la conducta y aprendizaje",
      "No tiene importancia",
      "Solo sirve para castigar",
      "Evita todo aprendizaje"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 12,
    pregunta: "Un niño que aprende a saludar viendo a sus padres aplica:",
    opciones: [
      "Aprendizaje por observación",
      "Condicionamiento clásico",
      "Memorización",
      "Aprendizaje biológico"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 13,
    pregunta: "¿Qué ocurre cuando una persona imita una conducta observada?",
    opciones: [
      "Reproduce un comportamiento aprendido",
      "Pierde la capacidad de aprender",
      "Olvida la información",
      "Elimina el conocimiento"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 14,
    pregunta: "El aprendizaje social reconoce que las personas son:",
    opciones: [
      "Participantes activos de su aprendizaje",
      "Seres pasivos sin influencia",
      "Controladas totalmente por premios",
      "Incapaces de cambiar"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 15,
    pregunta: "¿Qué sucede si una persona observa una conducta y ve que recibe recompensa?",
    opciones: [
      "Aumenta la posibilidad de imitarla",
      "La elimina inmediatamente",
      "No aprende nada",
      "Pierde motivación"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 16,
    pregunta: "Un estudiante que aprende una habilidad viendo a un compañero utiliza:",
    opciones: [
      "Aprendizaje social",
      "Castigo negativo",
      "Memoria genética",
      "Condicionamiento biológico"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 17,
    pregunta: "¿Qué diferencia al aprendizaje social del conductismo tradicional?",
    opciones: [
      "Incluye procesos mentales como atención y motivación",
      "Niega la influencia del ambiente",
      "Solo estudia animales",
      "Elimina la conducta observable"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 18,
    pregunta: "¿Qué puede influir en que una persona imite a un modelo?",
    opciones: [
      "La confianza y admiración hacia el modelo",
      "Solo la edad",
      "El tamaño del aula",
      "La cantidad de tareas"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 19,
    pregunta: "Los padres y profesores pueden ser modelos porque:",
    opciones: [
      "Sus conductas pueden ser observadas e imitadas",
      "Controlan totalmente la mente",
      "Evitan cualquier aprendizaje",
      "No influyen en los niños"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 20,
    pregunta: "¿Qué papel tiene la motivación en el aprendizaje social?",
    opciones: [
      "Impulsa a realizar la conducta aprendida",
      "Elimina la observación",
      "Impide aprender",
      "No tiene función"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 21,
    pregunta: "¿Qué ejemplo representa aprendizaje social?",
    opciones: [
      "Un niño aprende modales observando a sus padres",
      "Memorizar una definición sin entenderla",
      "Recibir un castigo sin aprender",
      "Dormir durante una clase"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 22,
    pregunta: "Bandura afirmó que las personas pueden aprender sin:",
    opciones: [
      "Realizar directamente la conducta",
      "Observar a otros",
      "Tener memoria",
      "Tener motivación"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 23,
    pregunta: "¿Qué es el refuerzo vicario?",
    opciones: [
      "Aprender viendo las consecuencias que recibe otra persona",
      "Un castigo personal",
      "Una repetición sin sentido",
      "Un error de aprendizaje"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 24,
    pregunta: "La televisión y redes sociales pueden influir en el aprendizaje porque:",
    opciones: [
      "Presentan modelos de conducta",
      "Eliminan la observación",
      "Impiden aprender",
      "No muestran comportamientos"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 25,
    pregunta: "¿Qué elemento permite que una conducta observada sea recordada?",
    opciones: [
      "Retención",
      "Castigo",
      "Eliminación",
      "Desinterés"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 26,
    pregunta: "Un profesor que demuestra respeto enseña mediante:",
    opciones: [
      "Modelamiento",
      "Castigo",
      "Memorización",
      "Condicionamiento clásico"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 27,
    pregunta: "La teoría de Bandura combina elementos de:",
    opciones: [
      "Conducta, pensamiento y ambiente",
      "Solo genética",
      "Solo memoria",
      "Solo castigos"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 28,
    pregunta: "¿Qué significa modelamiento en aprendizaje social?",
    opciones: [
      "Aprender observando e imitando modelos",
      "Repetir información sin comprender",
      "Recibir premios siempre",
      "Evitar experiencias"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 29,
    pregunta: "¿Por qué los compañeros pueden influir en el aprendizaje?",
    opciones: [
      "Porque sus conductas pueden ser observadas e imitadas",
      "Porque controlan la inteligencia",
      "Porque eliminan la motivación",
      "Porque reemplazan al profesor"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },

  {
    id: 30,
    pregunta: "La principal enseñanza de la teoría del aprendizaje social es que:",
    opciones: [
      "Aprendemos también mediante la observación de otros",
      "Solo aprendemos con castigos",
      "El ambiente no influye",
      "La conducta nunca cambia"
    ],
    respuesta: "A",
    categoria: "Aprendizaje Social"
  },
]