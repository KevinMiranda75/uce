import React, { useState, useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { ArrowRight, RotateCcw, Feather } from 'lucide-react';

/* ---------------------------------------------------------
   TOKENS DE DISEÑO
--------------------------------------------------------- */
const COLORS = {
  ink: '#14161c',
  inkSoft: '#1d2029',
  inkLine: '#2c303c',
  parchment: '#e9e2cf',
  parchmentSoft: '#f2ecdb',
  gold: '#b8902f',
  goldSoft: '#d9b45c',
  textDark: '#2a2118',
  textMuted: '#6b5f4a',
  textLight: '#ece7da',
  textLightMuted: '#9a9689',
};

const FONTS = {
  display: "'Cormorant Garamond', 'Georgia', serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
};

/* ---------------------------------------------------------
   VALORES (orden fijo = orden de los ejes en la brújula)
--------------------------------------------------------- */
const VALUES = [
  'Actitud científica',
  'Altivez',
  'Conciencia social',
  'Creatividad',
  'Disciplina',
  'Exactitud',
  'Gratitud',
  'Honradez',
  'Humanismo',
  'Internacionalismo',
  'Justicia',
  'Libertad',
  'Responsabilidad',
  'Solidaridad',
  'Veracidad',
];

/* ---------------------------------------------------------
   15 DILEMAS — cada opción está ligada a un valor distinto,
   distribuidos para que cada valor aparezca 4 veces en total.
--------------------------------------------------------- */
const DILEMMAS = [
  {
    title: 'El experimento fallido',
    text: 'Tu equipo presenta un proyecto para la feria de ciencias, pero los resultados no cuadran con lo esperado y quedan solo dos días para la entrega.',
    options: [
      { value: 'Actitud científica', text: 'Repito las pruebas con más cuidado para entender qué falló realmente.' },
      { value: 'Creatividad', text: 'Busco un enfoque distinto que nadie más había pensado.' },
      { value: 'Gratitud', text: 'Le agradezco a mi profesor su paciencia y le pido una idea para orientarme.' },
      { value: 'Internacionalismo', text: 'Reviso cómo en otros países resolvieron proyectos parecidos.' },
    ],
  },
  {
    title: 'El grupo de chat',
    text: 'En el chat del salón alguien empieza a burlarse de un compañero por su forma de hablar.',
    options: [
      { value: 'Altivez', text: 'Defiendo con firmeza y dignidad a mi compañero, sin dejarme intimidar por el grupo.' },
      { value: 'Disciplina', text: 'Sigo las normas de convivencia del aula y reporto la situación con calma.' },
      { value: 'Honradez', text: 'Digo abiertamente que no estoy de acuerdo, aunque no le guste a todos.' },
      { value: 'Justicia', text: 'Propongo que el trato sea igual para todos, sin importar cómo hable cada quien.' },
    ],
  },
  {
    title: 'El barrio necesita ayuda',
    text: 'Tu comunidad organiza una jornada de limpieza el sábado, justo el día que tenías planes personales.',
    options: [
      { value: 'Conciencia social', text: 'Cancelo mis planes y participo, porque el barrio nos beneficia a todos.' },
      { value: 'Exactitud', text: 'Reviso bien el horario para cumplir sin descuidar mis otras tareas.' },
      { value: 'Humanismo', text: 'Voy pensando en las personas mayores que más se benefician de esto.' },
      { value: 'Libertad', text: 'Decido participar por mi propia voluntad, no porque me obliguen.' },
    ],
  },
  {
    title: 'El proyecto en equipo',
    text: 'Te toca coordinar un trabajo grupal y uno de tus compañeros propone una idea poco convencional.',
    options: [
      { value: 'Creatividad', text: 'Apoyo la idea distinta, aunque implique salir del formato de siempre.' },
      { value: 'Gratitud', text: 'Reconozco el esfuerzo de quien propuso la idea, sea cual sea el resultado.' },
      { value: 'Internacionalismo', text: 'Sugiero mezclarla con ejemplos de otras culturas que conozco.' },
      { value: 'Responsabilidad', text: 'Me aseguro de que el proyecto se entregue completo y a tiempo.' },
    ],
  },
  {
    title: 'El examen que se acerca',
    text: 'Faltan tres días para un examen importante y tienes la tentación de dejarlo todo para el último momento.',
    options: [
      { value: 'Disciplina', text: 'Organizo un horario de estudio diario y lo cumplo sin excusas.' },
      { value: 'Honradez', text: 'Estudio de verdad en vez de buscar cómo copiar en el examen.' },
      { value: 'Justicia', text: 'Le explico a un compañero lo que no entiende, igual que otros me ayudaron antes.' },
      { value: 'Solidaridad', text: 'Formo un grupo de estudio para que a nadie le vaya mal por falta de apoyo.' },
    ],
  },
  {
    title: 'El informe con datos',
    text: 'Estás terminando un informe con estadísticas y notas que un número no termina de cuadrar.',
    options: [
      { value: 'Exactitud', text: 'Reviso cada dato hasta estar seguro de que todo es preciso.' },
      { value: 'Humanismo', text: 'Pienso en cómo ese informe puede ayudar a quienes lo van a usar.' },
      { value: 'Libertad', text: 'Escribo mis propias conclusiones, sin copiar literalmente otra fuente.' },
      { value: 'Veracidad', text: 'Prefiero mostrar el dato real, aunque no sea el resultado que esperaba.' },
    ],
  },
  {
    title: 'El maestro que se jubila',
    text: 'El profesor que más te ha enseñado se va a jubilar y organizan una despedida.',
    options: [
      { value: 'Gratitud', text: 'Le escribo unas palabras sinceras agradeciendo todo lo que me enseñó.' },
      { value: 'Internacionalismo', text: 'Le cuento cómo sus clases me ayudaron a entender mejor el mundo, no solo mi país.' },
      { value: 'Responsabilidad', text: 'Me ofrezco a organizar la actividad de despedida con el resto del salón.' },
      { value: 'Actitud científica', text: 'Le pregunto qué consejo me daría para seguir investigando por mi cuenta.' },
    ],
  },
  {
    title: 'El objeto perdido',
    text: 'Encuentras una billetera con dinero en el pasillo de la escuela.',
    options: [
      { value: 'Honradez', text: 'La entrego en la dirección tal como la encontré, sin tocar nada.' },
      { value: 'Justicia', text: 'Pienso que lo correcto es que su dueño la recupere completa, sin importar cuánto tenga.' },
      { value: 'Solidaridad', text: 'Pregunto entre mis compañeros si alguien la perdió, para ayudar a encontrarlo rápido.' },
      { value: 'Altivez', text: 'Aunque nadie me viera, actúo con la misma dignidad que si me estuvieran observando.' },
    ],
  },
  {
    title: 'El nuevo estudiante',
    text: 'Llega un estudiante nuevo al salón que viste, habla o cree distinto a la mayoría.',
    options: [
      { value: 'Humanismo', text: 'Me acerco a conocerlo como persona, más allá de sus diferencias.' },
      { value: 'Libertad', text: 'Respeto que piense distinto, aunque yo no comparta sus ideas.' },
      { value: 'Veracidad', text: 'Le hablo con sinceridad desde el primer día, sin fingir ser alguien más.' },
      { value: 'Conciencia social', text: 'Pienso en cómo el grupo puede incluirlo mejor en las actividades.' },
    ],
  },
  {
    title: 'El intercambio escolar',
    text: 'Tu escuela recibe estudiantes de otro país por un programa de intercambio.',
    options: [
      { value: 'Internacionalismo', text: 'Me intereso genuinamente por su cultura y comparto la mía con ellos.' },
      { value: 'Responsabilidad', text: 'Me ofrezco como guía para que su estadía sea organizada y sin contratiempos.' },
      { value: 'Actitud científica', text: 'Les pregunto cómo enseñan ciencia en su país para comparar métodos.' },
      { value: 'Creatividad', text: 'Organizamos juntos una actividad que mezcle ambas culturas de forma original.' },
    ],
  },
  {
    title: 'La tarea repartida',
    text: 'En un trabajo en grupo, notas que una persona siempre termina haciendo más que las demás.',
    options: [
      { value: 'Justicia', text: 'Propongo repartir las tareas de forma equitativa entre todos.' },
      { value: 'Solidaridad', text: 'Me ofrezco a ayudar a quien está cargando con más trabajo.' },
      { value: 'Altivez', text: 'Hablo con el grupo con firmeza, sin miedo a señalar lo que está mal.' },
      { value: 'Disciplina', text: 'Establezco un cronograma claro para que cada quien cumpla su parte.' },
    ],
  },
  {
    title: 'La opinión distinta',
    text: 'En un debate de clase, tu opinión sobre un tema es muy diferente a la de la mayoría.',
    options: [
      { value: 'Libertad', text: 'Expreso mi punto de vista con respeto, aunque sea el único que piensa así.' },
      { value: 'Veracidad', text: 'Digo lo que realmente pienso, en vez de repetir lo que otros quieren oír.' },
      { value: 'Conciencia social', text: 'Explico cómo mi opinión busca el bien del grupo, no solo el mío.' },
      { value: 'Exactitud', text: 'Sustento mi opinión con datos precisos, no solo con lo que siento.' },
    ],
  },
  {
    title: 'El proyecto final',
    text: 'Se acerca la entrega del proyecto final del curso y tienes que decidir cómo enfocarlo.',
    options: [
      { value: 'Responsabilidad', text: 'Me organizo para cumplir con cada parte del proyecto a tiempo.' },
      { value: 'Actitud científica', text: 'Investigo a fondo antes de sacar cualquier conclusión.' },
      { value: 'Creatividad', text: 'Le doy un enfoque original que lo distinga de los demás.' },
      { value: 'Gratitud', text: 'Dedico una parte a reconocer a quienes me ayudaron durante el curso.' },
    ],
  },
  {
    title: 'El compañero enfermo',
    text: 'Un compañero falta varios días a clases por una enfermedad y se atrasa en las materias.',
    options: [
      { value: 'Solidaridad', text: 'Le llevo los apuntes y le explico lo que se perdió.' },
      { value: 'Altivez', text: 'Lo defiendo si alguien lo molesta por haber faltado.' },
      { value: 'Disciplina', text: 'Le ayudo a armar un plan para ponerse al día sin abrumarse.' },
      { value: 'Honradez', text: 'Le cuento con claridad qué tan atrasado está, sin exagerar ni minimizar.' },
    ],
  },
  {
    title: 'La verdad incómoda',
    text: 'Un amigo te pregunta tu opinión sincera sobre un trabajo que hizo con mucho esfuerzo, pero que tiene errores.',
    options: [
      { value: 'Veracidad', text: 'Le digo la verdad con respeto, porque prefiero ser honesto que quedar bien.' },
      { value: 'Conciencia social', text: 'Pienso en cómo mi respuesta puede ayudarlo a mejorar, no solo a sentirse bien.' },
      { value: 'Exactitud', text: 'Le señalo con precisión qué partes tienen errores y cuáles no.' },
      { value: 'Humanismo', text: 'Cuido sus sentimientos mientras le doy una opinión honesta.' },
    ],
  },
];

/* ---------------------------------------------------------
   COMPONENTE PRINCIPAL
--------------------------------------------------------- */
export default function JuegoValores() {
  const [step, setStep] = useState(-1); // -1 intro | 0..14 dilemas | 15 resultados
  const [scores, setScores] = useState(() =>
    Object.fromEntries(VALUES.map((v) => [v, 0]))
  );
  const [selected, setSelected] = useState(null);

  const total = DILEMMAS.length;
  const current = step >= 0 && step < total ? DILEMMAS[step] : null;

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const val = current.options[idx].value;
    setScores((prev) => ({ ...prev, [val]: prev[val] + 1 }));
    setTimeout(() => {
      setSelected(null);
      setStep((s) => s + 1);
    }, 2050);
  };

  const restart = () => {
    setScores(Object.fromEntries(VALUES.map((v) => [v, 0])));
    setSelected(null);
    setStep(-1);
  };

  const radarData = useMemo(
    () => VALUES.map((v) => ({ value: v, score: scores[v] })),
    [scores]
  );

  const top3 = useMemo(
    () =>
      [...radarData]
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .filter((d) => d.score > 0),
    [radarData]
  );

  return (
    <div
      style={{
        background: COLORS.ink,
        fontFamily: FONTS.body,
        minHeight: '640px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
        .jv-fade { animation: jvFadeIn 0.4s ease both; }
        @keyframes jvFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .jv-stamp { animation: jvStamp 0.5s cubic-bezier(.34,1.56,.64,1) both; }
        @keyframes jvStamp { from { opacity: 0; transform: scale(0.4) rotate(-8deg); } to { opacity: 1; transform: scale(1) rotate(-8deg); } }
        .jv-option:hover .jv-option-inner { border-color: ${COLORS.gold} !important; }
      `}</style>

      {/* fondo textura sutil */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${COLORS.inkSoft} 1px, transparent 1px)`,
          backgroundSize: '22px 22px',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
        {/* ---------------- INTRO ---------------- */}
        {step === -1 && (
          <div className="jv-fade" style={{ textAlign: 'center' }}>
            <Feather size={30} color={COLORS.gold} style={{ marginBottom: 14 }} />
            <h1
              style={{
                fontFamily: FONTS.display,
                color: COLORS.textLight,
                fontSize: '42px',
                fontWeight: 600,
                letterSpacing: '0.3px',
                margin: '0 0 10px',
              }}
            >
              La brújula de los valores
            </h1>
            <p
              style={{
                color: COLORS.textLightMuted,
                fontSize: '15px',
                lineHeight: 1.6,
                maxWidth: '440px',
                margin: '0 auto 30px',
              }}
            >
              15 situaciones cotidianas, ninguna respuesta incorrecta. Cada elección
              revela qué valor guía más tus decisiones. Al final verás tu perfil completo.
            </p>
            <button
              onClick={() => setStep(0)}
              style={{
                background: COLORS.gold,
                color: COLORS.ink,
                border: 'none',
                borderRadius: '999px',
                padding: '13px 30px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Comenzar <ArrowRight size={17} />
            </button>
          </div>
        )}

        {/* ---------------- DILEMA ---------------- */}
        {current && (
          <div key={step} className="jv-fade">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.mono,
                  color: COLORS.textLightMuted,
                  fontSize: '12px',
                  letterSpacing: '1px',
                }}
              >
                {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {DILEMMAS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: i <= step ? COLORS.gold : COLORS.inkLine,
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                background: COLORS.parchment,
                borderRadius: '18px',
                padding: '34px 30px',
                boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
                position: 'relative',
              }}
            >
              {selected !== null && (
                <div
                  className="jv-stamp"
                  style={{
                    position: 'absolute',
                    top: '-18px',
                    right: '-14px',
                    background: COLORS.gold,
                    color: COLORS.ink,
                    borderRadius: '50%',
                    width: '92px',
                    height: '92px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    padding: '8px',
                    border: `3px solid ${COLORS.ink}`,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
                  }}
                >
                  {current.options[selected].value}
                </div>
              )}

              <p
                style={{
                  fontFamily: FONTS.mono,
                  color: COLORS.gold,
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  margin: '0 0 10px',
                }}
              >
                {current.title}
              </p>
              <p
                style={{
                  fontFamily: FONTS.display,
                  color: COLORS.textDark,
                  fontSize: '24px',
                  lineHeight: 1.4,
                  fontWeight: 600,
                  margin: '0 0 26px',
                }}
              >
                {current.text}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {current.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isDimmed = selected !== null && !isSelected;
                  return (
                    <button
                      key={i}
                      className="jv-option"
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      style={{
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                        cursor: selected === null ? 'pointer' : 'default',
                        opacity: isDimmed ? 0.4 : 1,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <div
                        className="jv-option-inner"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          border: `1.5px solid ${isSelected ? COLORS.gold : '#cfc4a4'}`,
                          borderRadius: '12px',
                          padding: '14px 16px',
                          background: isSelected ? COLORS.parchmentSoft : 'transparent',
                          transition: 'border-color 0.2s ease, background 0.2s ease',
                        }}
                      >
                        <span
                          style={{
                            width: '26px',
                            height: '26px',
                            minWidth: '26px',
                            borderRadius: '50%',
                            border: `1.5px solid ${COLORS.gold}`,
                            color: COLORS.gold,
                            fontFamily: FONTS.mono,
                            fontSize: '12px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span
                          style={{
                            color: COLORS.textDark,
                            fontSize: '14.5px',
                            lineHeight: 1.4,
                          }}
                        >
                          {opt.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- RESULTADOS ---------------- */}
        {step === total && (
          <div className="jv-fade" style={{ textAlign: 'center' }}>
            <p
              style={{
                fontFamily: FONTS.mono,
                color: COLORS.gold,
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              Recorrido completo
            </p>
            <h2
              style={{
                fontFamily: FONTS.display,
                color: COLORS.textLight,
                fontSize: '32px',
                fontWeight: 600,
                margin: '0 0 20px',
              }}
            >
              Tu perfil de valores
            </h2>

            <div
              style={{
                background: COLORS.inkSoft,
                borderRadius: '18px',
                padding: '10px 6px 4px',
                border: `1px solid ${COLORS.inkLine}`,
              }}
            >
              <ResponsiveContainer width="100%" height={340}>
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke={COLORS.inkLine} />
                  <PolarAngleAxis
                    dataKey="value"
                    tick={{ fill: COLORS.textLightMuted, fontSize: 9.5 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 4]}
                    tick={{ fill: COLORS.textLightMuted, fontSize: 8 }}
                    stroke={COLORS.inkLine}
                  />
                  <Radar
                    dataKey="score"
                    stroke={COLORS.gold}
                    fill={COLORS.gold}
                    fillOpacity={0.35}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {top3.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginTop: '20px',
                }}
              >
                {top3.map((t) => (
                  <div
                    key={t.value}
                    style={{
                      background: COLORS.parchment,
                      color: COLORS.textDark,
                      borderRadius: '999px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ color: COLORS.gold }}>●</span>
                    {t.value}
                    <span style={{ fontFamily: FONTS.mono, color: COLORS.textMuted, fontSize: '11px' }}>
                      {t.score}/4
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={restart}
              style={{
                marginTop: '28px',
                background: 'transparent',
                color: COLORS.textLight,
                border: `1.5px solid ${COLORS.inkLine}`,
                borderRadius: '999px',
                padding: '11px 24px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <RotateCcw size={15} /> Jugar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
