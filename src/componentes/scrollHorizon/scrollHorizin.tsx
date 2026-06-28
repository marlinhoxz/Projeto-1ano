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
    titulo: "O Primeiro encontro",
    descricao: "Quem diria que aquele pequeno encontro na chuva ia nos render historia! ",
    foto: "/assets/imgScroll/primeirorole.webp",
  },
  {
    id: "02",
    mes: "fevereiro",
    titulo: "O Pedido",
    descricao: "Pensamos que ia ser algo bobo, sem continuidade, mas hoje sabemos que estávamos totalmente errados.",
    foto: "/assets/imgScroll/fotoalianca.webp",
  },
  {
    id: "03",
    mes: "março",
    titulo: "Familia",
    descricao: "Com você ganhei uma nova família, um lugar onde me acolheram com tanto amor que até hoje me vejo perdido no meio dele. E, com isso, ganhei tantas memórias e momentos inesquecíveis que vou contar com toda a alegria do meu coração.",
    foto: "/assets/imgScroll/fotodafamilia.webp",
  },
  {
    id: "04",
    mes: "abril",
    titulo: "A Viagem",
    descricao: "Essa viagem nos trouxe paz no meio de tantas atribulações, renovou nossos laços e nos deixou momentos que jamais vamos esquecer.",
    foto: "/assets/imgScroll/dedodedeus.webp",
  },
  {
    id: "05",
    mes: "maio",
    titulo: "Momentos Incriveis",
    descricao: "E de quebra foi um presente de aniversário maravilhoso; cada instante, cada riso, cada momento foi incrível!. Obrigado!.",
    foto: "/assets/imgScroll/BeijoMontanha.webp",
  },
  {
    id: "06",
    mes: "junho",
    titulo: "Nossa Menina",
    descricao: "Ela também veio no pacote! No início, fiquei com aquele receio em silêncio de não dar conta do recado ou de não me encaixar. Mas o tempo voou e provou o contrário. Ver que o amor dobrou de tamanho e sentir essa sensação boa de ter mais alguém me esperando em casa... não dá nem pra explicar. É bom demais!.",
    foto: "/assets/imgScroll/escolacarla.webp",
  },
  {
    id: "07",
    mes: "julho",
    titulo: "Laços Fortes",
    descricao: "Graças a Deus, quanto mais o tempo passa, mais a nossa base fica forte. A gente aprendeu a se apoiar em tudo e a se unir cada vez mais. E o principal de tudo: sempre juntos.",
    foto: "/assets/imgScroll/escadadalapa.webp",
  },
  {
    id: "08",
    mes: "agosto",
    titulo: "Nossa História",
    descricao: "E essa história? Estou amando viver cada segundo dela ao seu lado...",
    foto: "/assets/imgScroll/beijonorelogio.webp",
  },
  {
    id: "09",
    mes: "setembro",
    titulo: "Para sempre nós",
    descricao: '"O amor tudo sofre, tudo crê, tudo espera, tudo suporta."',
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
              Feliz 1 ano juntos, TE AMO!
            </p>
          </div>
        </div>

        <div className={styles.fadeEsq} aria-hidden="true" />
        <div className={styles.fadeDir} aria-hidden="true" />
      </div>
    </section>
  );
}
