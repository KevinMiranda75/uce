import { useState, useCallback, useRef } from "react";
import { PREGUNTAS, Pregunta } from "./preguntas";
import { SERPIENTES, ESCALERAS, GEMINI_URL } from "./constants";

export type PlayerType = "human" | "ai";
export type GamePhase =
  | "setup"
  | "question"
  | "answer_result"
  | "dice"
  | "moving"
  | "winner";

export interface Player {
  id: number;
  name: string;
  type: PlayerType;
  color: string;
  colorLight: string;
  colorText: string;
  position: number;
}

export interface GameEvent {
  type: "snake" | "ladder" | "move" | "win" | "wrong" | "correct";
  message: string;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  currentTurn: number;
  question: Pregunta | null;
  selectedAnswer: "A" | "B" | "C" | "D" | null;
  isCorrect: boolean | null;
  diceValue: number | null;
  rollingDice: boolean;
  aiThinking: boolean;
  event: GameEvent | null;
  usedQuestions: Set<number>;
  showObstacleModal?: boolean;
  obstacleModalMessage?: string;
}

async function askGemini(question: Pregunta): Promise<"A" | "B" | "C" | "D"> {
  try {
    const prompt = `Eres un jugador de trivia sobre aprendizaje social. Responde ÚNICAMENTE con la letra correcta: A, B, C o D. Sin puntos, sin explicación, solo la letra.

Pregunta: ${question.pregunta}
A) ${question.opciones[0]}
B) ${question.opciones[1]}
C) ${question.opciones[2]}
D) ${question.opciones[3]}`;

    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    const data = await res.json();
    const text: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toUpperCase() ||
      "";
    const match = text.match(/^[ABCD]/);
    if (match) return match[0] as "A" | "B" | "C" | "D";
  } catch (_) { }

  // Fallback: 90% acierto
  if (Math.random() < 0.9) return question.respuesta;
  const wrong = (["A", "B", "C", "D"] as const).filter(
    (l) => l !== question.respuesta
  );
  return wrong[Math.floor(Math.random() * wrong.length)];
}

function pickQuestion(used: Set<number>): Pregunta {
  const available = PREGUNTAS.filter((p) => !used.has(p.id));
  const pool = available.length > 0 ? available : PREGUNTAS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function useGameLogic() {
  const [state, setState] = useState<GameState>({
    phase: "setup",
    players: [],
    currentTurn: 0,
    question: null,
    selectedAnswer: null,
    isCorrect: null,
    diceValue: null,
    rollingDice: false,
    aiThinking: false,
    event: null,
    usedQuestions: new Set(),
    // ── AGREGA ESTOS DEFAULTS ──
    showObstacleModal: false,
    obstacleModalMessage: "",
  });

  const rollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startGame = useCallback((players: Player[]) => {
    const q = pickQuestion(new Set());
    setState({
      phase: "question",
      players: players.map((p) => ({ ...p, position: 0 })),
      currentTurn: 0,
      question: q,
      selectedAnswer: null,
      isCorrect: null,
      diceValue: null,
      rollingDice: false,
      aiThinking: players[0].type === "ai",
      event: null,
      usedQuestions: new Set([q.id]),
    });

    if (players[0].type === "ai") {
      setTimeout(async () => {
        const answer = await askGemini(q);
        handleAnswerInternal(answer, q, players, 0, new Set([q.id]));
      }, 1200 + Math.random() * 800);
    }
  }, []);

  function handleAnswerInternal(
    answer: "A" | "B" | "C" | "D",
    question: Pregunta,
    players: Player[],
    currentTurn: number,
    usedQ: Set<number>
  ) {
    const correct = answer === question.respuesta;
    setState((prev) => ({
      ...prev,
      selectedAnswer: answer,
      isCorrect: correct,
      aiThinking: false,
      phase: "answer_result",
      event: correct
        ? { type: "correct", message: "¡Correcto! Lanza el dado." }
        : { type: "wrong", message: "Respuesta incorrecta. Pierdes el turno." },
    }));
  }

  const submitAnswer = useCallback(
    (answer: "A" | "B" | "C" | "D") => {
      setState((prev) => {
        if (!prev.question || prev.selectedAnswer || prev.aiThinking)
          return prev;
        const correct = answer === prev.question.respuesta;
        return {
          ...prev,
          selectedAnswer: answer,
          isCorrect: correct,
          phase: "answer_result",
          event: correct
            ? { type: "correct", message: "¡Correcto! Lanza el dado." }
            : {
              type: "wrong",
              message: "Respuesta incorrecta. Pierdes el turno.",
            },
        };
      });
    },
    []
  );

  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, showObstacleModal: false }));
  }, []);

  const proceedAfterAnswer = useCallback(() => {
    setState((prev) => {
      if (prev.isCorrect) {
        return { ...prev, phase: "dice", event: null };
      }
      // Wrong: next turn
      const nextTurn = (prev.currentTurn + 1) % prev.players.length;
      const q = pickQuestion(prev.usedQuestions);
      const newUsed = new Set(prev.usedQuestions);
      newUsed.add(q.id);
      const nextPlayer = prev.players[nextTurn];
      const newState: GameState = {
        ...prev,
        currentTurn: nextTurn,
        question: q,
        selectedAnswer: null,
        isCorrect: null,
        diceValue: null,
        phase: "question",
        aiThinking: nextPlayer.type === "ai",
        event: null,
        usedQuestions: newUsed,
      };

      if (nextPlayer.type === "ai") {
        setTimeout(async () => {
          const answer = await askGemini(q);
          handleAnswerInternal(
            answer,
            q,
            prev.players,
            nextTurn,
            newUsed
          );
        }, 1200 + Math.random() * 800);
      }

      return newState;
    });
  }, []);

  // const rollDice = useCallback(() => {
  //   setState((prev) => ({ ...prev, rollingDice: true, diceValue: null }));

  //   let ticks = 0;
  //   rollTimerRef.current = setInterval(() => {
  //     ticks++;
  //     const fakeVal = Math.floor(Math.random() * 6) + 1;
  //     setState((prev) => ({ ...prev, diceValue: fakeVal }));

  //     if (ticks >= 10) {
  //       clearInterval(rollTimerRef.current!);
  //       const finalVal = Math.floor(Math.random() * 6) + 1;

  //       setState((prev) => {
  //         const player = prev.players[prev.currentTurn];
  //         let newPos = player.position + finalVal;
  //         if (newPos > 100) newPos = player.position; // no puede pasar de 100

  //         let event: GameEvent = {
  //           type: "move",
  //           message: `Avanzó ${finalVal} casilla${finalVal > 1 ? "s" : ""} → casilla ${newPos}`,
  //         };

  //         if (newPos === 100) {
  //           event = { type: "win", message: `¡${player.name} ganó el juego!` };
  //         } else if (SERPIENTES[newPos]) {
  //           const dest = SERPIENTES[newPos];
  //           event = {
  //             type: "snake",
  //             message: `🐍 ¡Serpiente! Baja de ${newPos} a ${dest}`,
  //           };
  //           newPos = dest;
  //         } else if (ESCALERAS[newPos]) {
  //           const dest = ESCALERAS[newPos];
  //           event = {
  //             type: "ladder",
  //             message: `🪜 ¡Escalera! Sube de ${newPos} a ${dest}`,
  //           };
  //           newPos = dest;
  //         }

  //         const updatedPlayers = prev.players.map((p, i) =>
  //           i === prev.currentTurn ? { ...p, position: newPos } : p
  //         );

  //         if (event.type === "win") {
  //           return {
  //             ...prev,
  //             players: updatedPlayers,
  //             diceValue: finalVal,
  //             rollingDice: false,
  //             phase: "winner",
  //             event,
  //           };
  //         }

  //         return {
  //           ...prev,
  //           players: updatedPlayers,
  //           diceValue: finalVal,
  //           rollingDice: false,
  //           phase: "moving",
  //           event,
  //         };
  //       });
  //     }
  //   }, 80);
  // }, []);




  const rollDice = useCallback(() => {
    setState((prev) => ({ ...prev, rollingDice: true, diceValue: null }));

    let ticks = 0;
    rollTimerRef.current = setInterval(() => {
      ticks++;
      const fakeVal = Math.floor(Math.random() * 6) + 1;
      setState((prev) => ({ ...prev, diceValue: fakeVal }));

      if (ticks >= 10) {
        clearInterval(rollTimerRef.current!);
        const finalVal = Math.floor(Math.random() * 6) + 1;

        setState((prev) => {
          const player = prev.players[prev.currentTurn];
          // Calculamos la casilla objetivo final (frenando en 60)
          const destinoFinaldado = Math.min(player.position + finalVal, 60);

          // ── ANTECEDENTE DE ANIMACIÓN CASILLA POR CASILLA ──
          let casillaActualAnimada = player.position;

          const animacionInterval = setInterval(() => {
            if (casillaActualAnimada < destinoFinaldado) {
              // Avanza un paso con el dado
              casillaActualAnimada++;

              setState((actualState) => ({
                ...actualState,
                players: actualState.players.map((p, i) =>
                  i === actualState.currentTurn ? { ...p, position: casillaActualAnimada } : p
                ),
              }));
            } else {
              // Ya terminó de moverse con el dado, ahora verificamos Serpientes o Escaleras
              clearInterval(animacionInterval);

              let posFinalConEfecto = destinoFinaldado;
              let modalMessage = ""; // Guardará el texto del modal

              let event: GameEvent = {
                type: "move",
                message: `Avanzó ${finalVal} casilla${finalVal > 1 ? "s" : ""} → casilla ${destinoFinaldado}`,
              };

              if (destinoFinaldado === 60) {
                event = { type: "win", message: `¡${player.name} ganó el juego!` };
              } else if (SERPIENTES[destinoFinaldado]) {
                posFinalConEfecto = SERPIENTES[destinoFinaldado];
                modalMessage = `¡Oh no! 🐍 Caes en una Serpiente. Vas a bajar de la casilla ${destinoFinaldado} a la ${posFinalConEfecto}`;
                event = {
                  type: "snake",
                  message: `🐍 ¡Serpiente! Baja de ${destinoFinaldado} a ${posFinalConEfecto}`,
                };
              } else if (ESCALERAS[destinoFinaldado]) {
                posFinalConEfecto = ESCALERAS[destinoFinaldado];
                modalMessage = `¡Súper! 🪜 ¡Encontraste una Escalera! Subes de la casilla ${destinoFinaldado} a la ${posFinalConEfecto}`;
                event = {
                  type: "ladder",
                  message: `🪜 ¡Escalera! Sube de ${destinoFinaldado} a ${posFinalConEfecto}`,
                };
              }

              // SI HUBO SERPIENTE O ESCALERA: Mostramos el modal primero
              if (posFinalConEfecto !== destinoFinaldado) {
                setState((actualState) => ({
                  ...actualState,
                  showObstacleModal: true, // 👈 Abre el modal
                  obstacleModalMessage: modalMessage,
                }));

                // Esperamos 2.5 segundos con el modal abierto antes de mover la ficha de golpe
                setTimeout(() => {
                  setState((actualState) => ({
                    ...actualState,
                    showObstacleModal: false, // 👈 Cierra el modal automáticamente
                    phase: posFinalConEfecto === 60 ? "winner" : "moving",
                    event,
                    players: actualState.players.map((p, i) =>
                      i === actualState.currentTurn ? { ...p, position: posFinalConEfecto } : p
                    ),
                  }));
                }, 3500);

              } else {
                // Movimiento normal sin trampas (No abre modal)
                setState((actualState) => ({
                  ...actualState,
                  phase: posFinalConEfecto === 60 ? "winner" : "moving",
                  event,
                }));
              }
            }
          }, 250); // ⏱️ Velocidad de la caminata: 250ms por cada casilla

          // Retornamos el estado inicial congelado mientras el intervalo secundario hace la magia
          return {
            ...prev,
            diceValue: finalVal,
            rollingDice: false,
          };
        });
      }
    }, 80);
  }, []);

  const nextTurn = useCallback(() => {
    setState((prev) => {
      const nextTurn = (prev.currentTurn + 1) % prev.players.length;
      const q = pickQuestion(prev.usedQuestions);
      const newUsed = new Set(prev.usedQuestions);
      newUsed.add(q.id);
      const nextPlayer = prev.players[nextTurn];

      const newState: GameState = {
        ...prev,
        currentTurn: nextTurn,
        question: q,
        selectedAnswer: null,
        isCorrect: null,
        diceValue: null,
        phase: "question",
        aiThinking: nextPlayer.type === "ai",
        event: null,
        usedQuestions: newUsed,
      };

      if (nextPlayer.type === "ai") {
        setTimeout(async () => {
          const answer = await askGemini(q);
          handleAnswerInternal(answer, q, prev.players, nextTurn, newUsed);
        }, 1200 + Math.random() * 800);
      }

      return newState;
    });
  }, []);

  const resetGame = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "setup" }));
  }, []);

  return { state, startGame, submitAnswer, proceedAfterAnswer, rollDice, nextTurn, resetGame, closeModal };
}
