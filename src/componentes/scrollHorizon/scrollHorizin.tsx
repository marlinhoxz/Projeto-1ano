"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./scroll.module.css";

gsap.registerPlugin(ScrollTrigger);

const momentos = [
  {
    id: "01",
    mes: "janeiro",
    titulo: "o primeiro olhar",
    descricao: "tudo começou com um sorriso que eu não consegui esquecer.",
    foto: "/assets/imgScroll/primeirorole.webp",
  },
  {
    id: "02",
    mes: "fevereiro",
    titulo: "nossa primeira viagem",
    descricao: "a estrada, o vento e você do meu lado — o suficiente.",
    foto: "/assets/imgScroll/fotoalianca.webp",
  },
  {
    id: "03",
    mes: "março",
    titulo: "dançando na cozinha",
    descricao: "sem música, sem motivo. só porque sim.",
    foto: "/assets/imgScroll/fotodafamilia.webp",
  },
  {
    id: "04",
    mes: "abril",
    titulo: "aquele jantar especial",
    descricao: "a comida queimou um pouco, mas foi perfeito assim mesmo.",
    foto: "/assets/imgScroll/dedodedeus.webp",
  },
  {
    id: "05",
    mes: "maio",
    titulo: "tarde de domingo",
    descricao: "cobertor, chuva na janela e você dormindo no meu ombro.",
    foto: "/assets/imgScroll/BeijoMontanha.webp",
  },
  {
    id: "06",
    mes: "junho",
    titulo: "rindo sem parar",
    descricao: "nem lembro mais o motivo. só sei que doeu de rir.",
    foto: "/assets/imgScroll/escolacarla.webp",
  },
  {
    id: "07",
    mes: "julho",
    titulo: "o beijo na chuva",
    descricao: "clichê, sim. mas foi real e foi nosso.",
    foto: "/assets/imgScroll/escadadalapa.webp",
  },
  {
    id: "08",
    mes: "agosto",
    titulo: "nossa música",
    descricao: "toda vez que toca, eu penso em você imediatamente.",
    foto: "/assets/imgScroll/beijonorelogio.webp",
  },
  {
    id: "09",
    mes: "setembro",
    titulo: "mãos dadas",
    descricao: "sem destino certo. a melhor caminhada que já fiz.",
    foto: "/assets/imgScroll/paquetamoreta.webp",
  },
];

export default function GaleriaMemórias() {
  const secaoRef = useRef<HTMLElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const contadorRef = useRef<HTMLSpanElement>(null);
  const cabecalhoRef = useRef<HTMLDivElement>(null);
  const [hintEsquerda, setHintEsquerda] = useState(false);
  const [setaEsquerda, setSetaEsquerda] = useState(false);
  const jaAvancouRef = useRef(false);

  useEffect(() => {
    const secao = secaoRef.current;
    const trilho = trilhoRef.current;
    const cabecalho = cabecalhoRef.current;
    if (!secao || !trilho || !cabecalho) return;

    const ctx = gsap.context(() => {
      const distancia = () => trilho.scrollWidth - window.innerWidth;

      const scrollAnim = gsap.to(trilho, {
        x: () => -distancia(),
        ease: "none",
        scrollTrigger: {
          trigger: secao,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${distancia()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress > 0.05) jaAvancouRef.current = true;

            const noFim = self.progress >= 0.97;
            const noInicio = self.progress <= 0.03 && jaAvancouRef.current;
            const ladoEsquerdo = noFim || noInicio;

            setHintEsquerda((atual) =>
              atual !== ladoEsquerdo ? ladoEsquerdo : atual,
            );
            setSetaEsquerda((atual) => (atual !== noFim ? noFim : atual));
          },
          onLeaveBack: () => {
            jaAvancouRef.current = false;
            setHintEsquerda(false);
            setSetaEsquerda(false);
          },
        },
      });

      gsap.from(cabecalho.querySelectorAll("[data-hd]"), {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: secao,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const frames = trilho.querySelectorAll<HTMLElement>("[data-frame]");

      frames.forEach((frame, i) => {
        ScrollTrigger.create({
          trigger: frame,
          containerAnimation: scrollAnim,
          start: "left center",
          end: "right center",
          onEnter: () => {
            if (contadorRef.current)
              contadorRef.current.textContent = String(i + 1).padStart(2, "0");
          },
          onEnterBack: () => {
            if (contadorRef.current)
              contadorRef.current.textContent = String(i + 1).padStart(2, "0");
          },
        });
      });

      frames.forEach((frame) => {
        const mascara = frame.querySelector<HTMLElement>("[data-mascara]");
        const fotoWrap = frame.querySelector<HTMLElement>("[data-foto]");
        const bordaTop = frame.querySelector<HTMLElement>("[data-bt]");
        const bordaBot = frame.querySelector<HTMLElement>("[data-bb]");
        const linhaVert = frame.querySelector<HTMLElement>("[data-lv]");
        const mes = frame.querySelector<HTMLElement>("[data-mes]");
        const titulo = frame.querySelector<HTMLElement>("[data-titulo]");
        const desc = frame.querySelector<HTMLElement>("[data-desc]");

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: frame,
            containerAnimation: scrollAnim,
            start: "left 55%",
            toggleActions: "play none none none",
          },
        });

        tl.from([bordaTop, bordaBot], {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        });

        tl.fromTo(
          mascara,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.4,
            ease: "power3.inOut",
          },
          "-=0.2",
        );

        tl.fromTo(
          fotoWrap,
          { scale: 1.08 },
          { scale: 1, duration: 0.9, ease: "power2.out" },
          "<",
        );

        tl.from(
          linhaVert,
          {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.4",
        );

        tl.fromTo(
          mes,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.28 },
          "-=0.2",
        );
        tl.fromTo(
          titulo,
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.35 },
          "-=0.18",
        );
        tl.fromTo(
          desc,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.3 },
          "-=0.2",
        );
      });
    }, secao);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={secaoRef} className={styles.secao}>
      <div className={styles.wrapper}>
        <div ref={cabecalhoRef} className={styles.cabecalho}>
          <p className={styles.cabecalhoLabel} data-hd>
            um ano ao seu lado
          </p>
          <h2 className={styles.cabecalhoTitulo} data-hd>
            Os nossos Momentos
          </h2>
          <div className={styles.cabecalhoLinha} data-hd aria-hidden="true" />
        </div>

        <div className={styles.hud} aria-hidden="true">
          <span className={styles.hudDiamond}>◆</span>
          <span className={styles.hudNum} ref={contadorRef}>
            01
          </span>
          <span className={styles.hudSep}>/</span>
          <span className={styles.hudTotal}>
            {String(momentos.length).padStart(2, "0")}
          </span>
        </div>

        <div
          className={`${styles.hint} ${hintEsquerda ? styles.hintEsquerda : ""}`}
          aria-hidden="true"
        >
          <span className={styles.hintTexto}>arraste</span>
          <span
            className={`${styles.hintSeta} ${setaEsquerda ? styles.hintSetaEsquerda : ""}`}
          >
            {setaEsquerda ? "←" : "→"}
          </span>
        </div>

        <div ref={trilhoRef} className={styles.trilho}>
          <div className={styles.espacoInicial} aria-hidden="true" />

          {momentos.map((m) => (
            <article key={m.id} className={styles.frame} data-frame>
              <div className={styles.bordaTop} data-bt aria-hidden="true" />
              <div className={styles.bordaBot} data-bb aria-hidden="true" />

              <div className={styles.fotoArea}>
                <div className={styles.mascara} data-mascara>
                  <div className={styles.fotoWrap} data-foto>
                    <Image
                      src={m.foto}
                      alt={m.titulo}
                      width={1200}
                      height={1600}
                      className={styles.foto}
                      sizes="40vw"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.lado}>
                <div className={styles.linhaVert} data-lv aria-hidden="true" />
                <h3 className={styles.legendaTitulo} data-titulo>
                  {m.titulo}
                </h3>
                <p className={styles.legendaDesc} data-desc>
                  {m.descricao}
                </p>
              </div>
            </article>
          ))}

          <div className={styles.espacoFinal}>
            <p className={styles.fimTexto}>
              fim do rolo ◆ {momentos.length} exposições
            </p>
          </div>
        </div>

        <div className={styles.fadeEsq} aria-hidden="true" />
        <div className={styles.fadeDir} aria-hidden="true" />
      </div>
    </section>
  );
}
