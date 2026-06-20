"use client";
import { useRef } from "react";
import gsap from "gsap";
import styles from "./envelope.module.css";
import CarimboSelo from "./CarimboSelo";

type PropsEnvelopeInicial = {
  aoAbrirCarta: () => void;
};

export default function EnvelopeInicial({
  aoAbrirCarta,
}: PropsEnvelopeInicial) {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const abaRef = useRef<HTMLDivElement>(null);
  const corpoRef = useRef<HTMLDivElement>(null);

  const animarAbertura = () => {
    const envelope = envelopeRef.current;
    const aba = abaRef.current;
    const corpo = corpoRef.current;

    if (!envelope || !aba || !corpo) return;

    const linha = gsap.timeline({
      onComplete: aoAbrirCarta,
    });

    linha.to(envelope, {
      rotate: -2,
      duration: 0.08,
      ease: "power2.out",
    });

    linha.to(envelope, {
      rotate: 2,
      duration: 0.08,
      ease: "power2.out",
    });

    linha.to(envelope, {
      rotate: 0,
      duration: 0.08,
    });

    linha.to(aba, {
      scaleY: -1,
      rotateX: 180,
      duration: 0.5,
      ease: "power2.inOut",
    });

    linha.to(
      envelope,
      {
        scale: 1.05,
        y: -20,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.2",
    );

    linha.to(envelope, {
      opacity: 0,
      scale: 1.15,
      duration: 0.35,
      ease: "power2.in",
    });
  };

  return (
    <section className={styles.secaoEnvelope} aria-label="Envelope de carta">
      <h1 className={styles.titulo}>Abra sua Cartinha!</h1>

      <div ref={envelopeRef} className={styles.envelope}>
        <div ref={abaRef} className={styles.abaEnvelope}>
          <div className={styles.abaTriangulo} />
        </div>

        <div ref={corpoRef} className={styles.corpoEnvelope}>
          <div className={styles.dobrasLaterais}>
            <div className={styles.dobraEsquerda} />
            <div className={styles.dobraDireita} />
          </div>
          <div className={styles.dobraInferior} />

          <div className={styles.centroCara}>
            <CarimboSelo aoClicar={animarAbertura} />
          </div>
        </div>
      </div>
    </section>
  );
}
