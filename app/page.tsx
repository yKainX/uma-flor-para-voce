"use client";

import { useEffect, useState } from "react";

const PETALS = Array.from({ length: 12 });
const BEAUTY_OPTIONS = ["5", "7", "8", "10"];

export default function Home() {
  const [gateStep, setGateStep] = useState<1 | 2 | 3>(1);
  const [firstError, setFirstError] = useState(false);
  const [triedNotes, setTriedNotes] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [showWords, setShowWords] = useState(false);

  const allNotesTried = triedNotes.length === BEAUTY_OPTIONS.length;

  useEffect(() => {
    if (!started) return;
    const timer = window.setTimeout(() => setShowWords(true), 7600);
    return () => window.clearTimeout(timer);
  }, [started]);

  function answerIdentity(correct: boolean) {
    if (correct) {
      setFirstError(false);
      setGateStep(2);
      return;
    }
    setFirstError(false);
    window.setTimeout(() => setFirstError(true), 20);
  }

  function tryNote(note: string) {
    if (!triedNotes.includes(note)) {
      setTriedNotes((current) => [...current, note]);
    }
  }

  function unlock() {
    setGateStep(3);
  }

  function begin() {
    setShowWords(false);
    setStarted(true);
  }

  function replay() {
    setStarted(false);
    setShowWords(false);
    window.setTimeout(begin, 120);
  }

  return (
    <main className={`experience ${started ? "is-started" : ""}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grain" />

      {gateStep < 3 && (
        <section className="quiz-shell" aria-live="polite">
          <div className="quiz-progress" aria-label={`Pergunta ${gateStep} de 2`}>
            <span className="progress-label">uma coisinha antes...</span>
            <span className="progress-count">0{gateStep} / 02</span>
          </div>

          {gateStep === 1 && (
            <div className="quiz-card quiz-enter">
              <span className="quiz-kicker">acesso exclusivo</span>
              <h1>Esse site foi feito única e exclusivamente para uma pessoa.</h1>
              <p className="quiz-lead">
                Se for você, certamente marcará a alternativa correta.
              </p>

              <div className={`answer-list ${firstError ? "has-error" : ""}`}>
                <button className="answer-option" onClick={() => answerIdentity(false)}>
                  <span>A</span> Clara Maria
                </button>
                <button className="answer-option" onClick={() => answerIdentity(false)}>
                  <span>B</span> Marian
                </button>
                <button className="answer-option" onClick={() => answerIdentity(true)}>
                  <span>C</span> Amorzinho da vida de quem fez o site
                </button>
              </div>

              <p className={`quiz-feedback ${firstError ? "is-visible" : ""}`}>
                acho que esse site ainda n é seu... tenta de novo 👀
              </p>
            </div>
          )}

          {gateStep === 2 && (
            <div className="quiz-card quiz-enter">
              <span className="quiz-kicker">última pergunta</span>
              <h1>Se a beleza de Maria Clara fosse definida em uma nota, qual seria?</h1>
              <p className="quiz-lead">Escolha com cuidado.</p>

              <div className="note-grid">
                {BEAUTY_OPTIONS.map((note, index) => {
                  const tried = triedNotes.includes(note);
                  return (
                    <button
                      className={`note-option ${tried ? "was-tried" : ""}`}
                      disabled={tried}
                      key={note}
                      onClick={() => tryNote(note)}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      {note}
                    </button>
                  );
                })}
              </div>

              {!allNotesTried && triedNotes.length > 0 && (
                <p className="note-hint">
                  {triedNotes.length === 1 && "essa nota ainda é pequena demais..."}
                  {triedNotes.length === 2 && "continua n sendo suficiente..."}
                  {triedNotes.length === 3 && "falta só uma tentativa 👀"}
                </p>
              )}

              {allNotesTried && (
                <div className="infinity-reveal">
                  <p>Nenhuma nota é capaz de definir o quão bela você é, meu amor.</p>
                  <button className="infinity-button" onClick={unlock} aria-label="Infinito">
                    <span>∞</span>
                    <small>essa é a resposta certa</small>
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {gateStep === 3 && !started && (
        <section className="intro" aria-labelledby="intro-title">
          <span className="tiny-heart" aria-hidden="true">♥</span>
          <p className="eyebrow">acesso liberado</p>
          <h1 id="intro-title">Só porque pensei em você.</h1>
          <button className="start-button" onClick={begin}>
            <span>toque para abrir</span>
            <span className="button-arrow" aria-hidden="true">→</span>
          </button>
        </section>
      )}

      {gateStep === 3 && started && (
        <section className="garden" aria-live="polite">
          <p className="growing-copy">um carinho está florescendo...</p>

          <div className="flower-scene" aria-hidden="true">
            <div className="ground-shadow" />
            <div className="stem">
              <div className="leaf leaf-left" />
              <div className="leaf leaf-right" />
            </div>
            <div className="flower-head">
              {PETALS.map((_, index) => (
                <span
                  className="petal"
                  key={index}
                  style={{
                    "--angle": `${index * 30}deg`,
                    "--delay": `${3.15 + index * 0.11}s`,
                  } as React.CSSProperties}
                />
              ))}
              <span className="flower-center" />
            </div>
            <span className="spark spark-one">✦</span>
            <span className="spark spark-two">✦</span>
            <span className="spark spark-three">·</span>
          </div>

          <div className={`message ${showWords ? "is-visible" : ""}`}>
            <p className="love-note">eu te amo.</p>
            <p className="letter">
              N precisava ser uma data especial. Eu só queria te lembrar que vc
              deixa meus dias mais bonitos e que ter vc na minha vida é uma das
              coisas que eu mais amo. Espero que essa flor consiga arrancar pelo
              menos um sorrisinho seu hoje. <span>♥</span>
            </p>
            <button className="replay" onClick={replay}>ver de novo ↻</button>
          </div>
        </section>
      )}
    </main>
  );
}
