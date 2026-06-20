"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import type { ItemGaleria } from "./dados-galeria";
import styles from "./ItemFoto.module.css";

gsap.registerPlugin(ScrollTrigger);

type PropsItemFoto = {
  item: ItemGaleria;
  indice: number;
};

export default function ItemFoto({ item, indice }: PropsItemFoto) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fotoRef = useRef<HTMLDivElement>(null);
  const legendaRef = useRef<HTMLParagraphElement>(null);

  const ehPar = indice % 2 === 0;

  return (
    <div
      ref={containerRef}
      className={`${styles.item} ${ehPar ? styles.esquerda : styles.direita}`}
    >
      <div ref={fotoRef} className={styles.moldura}>
        <div className={styles.imagemContainer}>
          <Image
            src={item.srcFoto}
            alt={item.altFoto}
            fill
            className={styles.imagem}
            sizes="(max-width: 768px) 70vw, 300px"
          />
        </div>

        <div className={styles.bordaMoldura} aria-hidden="true" />
      </div>

      <p ref={legendaRef} className={styles.legenda}>
        {item.legenda}
      </p>
    </div>
  );
}
