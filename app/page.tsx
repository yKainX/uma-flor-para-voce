"use client";

import { useEffect, useState } from "react";

const PETALS = Array.from({ length: 12 });

export default function Home() {
  const [started, setStarted] = useState(false);
  const [showWords, setShowWords] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timer = window.setTimeout(() => setShowWords(true), 7600);
    return () => window.clearTimeout(timer);
  }, [started]);

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

      {!started && (
        <section className="intro" aria-labelledby="intro-title">
          <span className="tiny-heart" aria-hidden="true">♥</span>
          <p className="eyebrow">eu fiz uma coisinha pra vc</p>
          <h1 id="intro-title">Só porque pensei em você.</h1>
          <button className="start-button" onClick={begin}>
            <span>toque para abrir</span>
            <span className="button-arrow" aria-hidden="true">→</span>
          </button>
        </section>
      )}

      {started && (
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
