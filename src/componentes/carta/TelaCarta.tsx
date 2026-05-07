"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import RosaDecorativa from "./RosaDecorativa";
import PapelCarta from "./PapelCarta";
import EnvelopeInferior from "./EnvelopeInferior";
import styles from "./telacarta.module.css";

type PropsTelaCarta = {
  aoAvancarParaGaleria: () => void;
};

export default function TelaCarta({ aoAvancarParaGaleria }: PropsTelaCarta) {
  const papelRef = useRef<HTMLDivElement>(null);
  const envelopeInfRef = useRef<HTMLDivElement>(null);
  const rosaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const papel = papelRef.current;
    const envelopeInf = envelopeInfRef.current;
    const rosa = rosaRef.current;
    if (!papel || !envelopeInf || !rosa) return;

    gsap.set(papel, { y: -120, opacity: 0 });
    gsap.set(envelopeInf, { y: 60, opacity: 0 });
    gsap.set(rosa, { y: -30, opacity: 0, scale: 0.85 });

    const linha = gsap.timeline({ delay: 0.15 });

    linha.to(papel, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
    });

    linha.to(
      rosa,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.4)",
      },
      "-=0.5",
    );

    linha.to(
      envelopeInf,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3",
    );
  }, []);

  return (
    <section className={styles.tela} aria-label="Carta aberta">
      <div className={styles.areaCarta}>
        <div ref={rosaRef} className={styles.containerRosa}>
          <RosaDecorativa />
        </div>

        <div ref={papelRef} className={styles.containerPapel}>
          <PapelCarta />
        </div>
      </div>

      <div ref={envelopeInfRef} className={styles.areaEnvelopeInferior}>
        <EnvelopeInferior aoAvancar={aoAvancarParaGaleria} />
      </div>
    </section>
  );
}
