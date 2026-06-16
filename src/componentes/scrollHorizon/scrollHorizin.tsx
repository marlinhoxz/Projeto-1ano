"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import styles from "./scroll.module.css"

gsap.registerPlugin(ScrollTrigger)

const momentos = [
  { id: "01", mes: "janeiro",   titulo: "o primeiro olhar",       descricao: "tudo começou com um sorriso que eu não consegui esquecer.",   foto: "https://picsum.photos/seed/amor01/800/1000" },
  { id: "02", mes: "fevereiro", titulo: "nossa primeira viagem",  descricao: "a estrada, o vento e você do meu lado — o suficiente.",       foto: "https://picsum.photos/seed/amor02/800/1000" },
  { id: "03", mes: "março",     titulo: "dançando na cozinha",    descricao: "sem música, sem motivo. só porque sim.",                      foto: "https://picsum.photos/seed/amor03/800/1000" },
  { id: "04", mes: "abril",     titulo: "aquele jantar especial", descricao: "a comida queimou um pouco, mas foi perfeito assim mesmo.",     foto: "https://picsum.photos/seed/amor04/800/1000" },
  { id: "05", mes: "maio",      titulo: "tarde de domingo",       descricao: "cobertor, chuva na janela e você dormindo no meu ombro.",      foto: "https://picsum.photos/seed/amor05/800/1000" },
  { id: "06", mes: "junho",     titulo: "rindo sem parar",        descricao: "nem lembro mais o motivo. só sei que doeu de rir.",           foto: "https://picsum.photos/seed/amor06/800/1000" },
  { id: "07", mes: "julho",     titulo: "o beijo na chuva",       descricao: "clichê, sim. mas foi real e foi nosso.",                      foto: "https://picsum.photos/seed/amor07/800/1000" },
  { id: "08", mes: "agosto",    titulo: "nossa música",           descricao: "toda vez que toca, eu penso em você imediatamente.",          foto: "https://picsum.photos/seed/amor08/800/1000" },
  { id: "09", mes: "setembro",  titulo: "mãos dadas",             descricao: "sem destino certo. a melhor caminhada que já fiz.",           foto: "https://picsum.photos/seed/amor09/800/1000" },
  { id: "10", mes: "outubro",   titulo: "noite de estrelas",      descricao: "deitados na grama, contando o que não se pode contar.",       foto: "https://picsum.photos/seed/amor10/800/1000" },
  { id: "11", mes: "novembro",  titulo: "café na cama",           descricao: "torrada queimada e suco azedo. o melhor café do ano.",        foto: "https://picsum.photos/seed/amor11/800/1000" },
  { id: "12", mes: "dezembro",  titulo: "um ano inteiro",         descricao: "doze meses, infinitos momentos, uma única certeza: você.",    foto: "https://picsum.photos/seed/amor12/800/1000" },
]

export default function GaleriaMemórias() {
  const secaoRef     = useRef<HTMLElement>(null)
  const trilhoRef    = useRef<HTMLDivElement>(null)
  const contadorRef  = useRef<HTMLSpanElement>(null)
  const cabecalhoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const secao     = secaoRef.current
    const trilho    = trilhoRef.current
    const cabecalho = cabecalhoRef.current
    if (!secao || !trilho || !cabecalho) return

    const ctx = gsap.context(() => {

      // ── 1. scroll horizontal pinado ──
      const distancia = () => trilho.scrollWidth - window.innerWidth

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
        },
      })

      // ── 2. cabeçalho entrada ──
      gsap.from(cabecalho.querySelectorAll("[data-hd]"), {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: secao,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })

      // ── 3. contador ──
      const frames = trilho.querySelectorAll<HTMLElement>("[data-frame]")

      frames.forEach((frame, i) => {
        ScrollTrigger.create({
          trigger: frame,
          containerAnimation: scrollAnim,
          start: "left center",
          end: "right center",
          onEnter:     () => { if (contadorRef.current) contadorRef.current.textContent = String(i + 1).padStart(2, "0") },
          onEnterBack: () => { if (contadorRef.current) contadorRef.current.textContent = String(i + 1).padStart(2, "0") },
        })
      })

      // ── 4. reveal de cada frame ──
      frames.forEach((frame) => {
        const mascara   = frame.querySelector<HTMLElement>("[data-mascara]")
        const fotoWrap  = frame.querySelector<HTMLElement>("[data-foto]")
        const bordaTop  = frame.querySelector<HTMLElement>("[data-bt]")
        const bordaBot  = frame.querySelector<HTMLElement>("[data-bb]")
        const linhaVert = frame.querySelector<HTMLElement>("[data-lv]")
        const mes       = frame.querySelector<HTMLElement>("[data-mes]")
        const titulo    = frame.querySelector<HTMLElement>("[data-titulo]")
        const desc      = frame.querySelector<HTMLElement>("[data-desc]")

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: frame,
            containerAnimation: scrollAnim,
            start: "left 55%",
            toggleActions: "play none none none",
          },
        })

        // linhas verticais crescem de cima pra baixo
        tl.from([bordaTop, bordaBot], {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        })

        // foto revela de baixo pra cima
        tl.fromTo(mascara,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power3.inOut" },
          "-=0.2"
        )

        // zoom out da foto
        tl.fromTo(fotoWrap,
          { scale: 1.08 },
          { scale: 1, duration: 0.9, ease: "power2.out" },
          "<"
        )

        // linha vert cresce
        tl.from(linhaVert, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.4")

        // textos em sequência
        tl.fromTo(mes,    { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.28 }, "-=0.2")
        tl.fromTo(titulo, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.35 }, "-=0.18")
        tl.fromTo(desc,   { opacity: 0, x: -8  }, { opacity: 1, x: 0, duration: 0.3  }, "-=0.2")
      })

    }, secao)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={secaoRef} className={styles.secao}>
      <div className={styles.wrapper}>

        {/* cabeçalho no topo */}
        <div ref={cabecalhoRef} className={styles.cabecalho}>
          <p className={styles.cabecalhoLabel} data-hd>um ano de memórias</p>
          <h2 className={styles.cabecalhoTitulo} data-hd>as nossas histórias</h2>
          <div className={styles.cabecalhoLinha} data-hd aria-hidden="true" />
        </div>

        {/* HUD */}
        <div className={styles.hud} aria-hidden="true">
          <span className={styles.hudDiamond}>◆</span>
          <span className={styles.hudNum} ref={contadorRef}>01</span>
          <span className={styles.hudSep}>/</span>
          <span className={styles.hudTotal}>12</span>
        </div>

        {/* hint */}
        <div className={styles.hint} aria-hidden="true">
          <span className={styles.hintTexto}>arraste</span>
          <span className={styles.hintSeta}>→</span>
        </div>

        {/* trilho */}
        <div ref={trilhoRef} className={styles.trilho}>

          <div className={styles.espacoInicial} aria-hidden="true" />

          {momentos.map((m) => (
            <article key={m.id} className={styles.frame} data-frame>

              {/* linhas verticais nas bordas */}
              <div className={styles.bordaTop} data-bt aria-hidden="true" />
              <div className={styles.bordaBot} data-bb aria-hidden="true" />

              {/* ── esquerda: foto ── */}
              <div className={styles.fotoArea}>
                <div className={styles.mascara} data-mascara>
                  <div className={styles.fotoWrap} data-foto>
                    <Image
                      src={m.foto}
                      alt={m.titulo}
                      fill
                      className={styles.foto}
                      sizes="55vw"
                    />
                    <div className={styles.vinheta} aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* ── direita: textos ── */}
              <div className={styles.lado}>
                <div className={styles.linhaVert} data-lv aria-hidden="true" />
                <h3 className={styles.legendaTitulo} data-titulo>{m.titulo}</h3>
                <p className={styles.legendaDesc} data-desc>{m.descricao}</p>
              </div>

            </article>
          ))}

          <div className={styles.espacoFinal}>
            <p className={styles.fimTexto}>fim do rolo ◆ 12 exposições</p>
          </div>

        </div>

        <div className={styles.fadeEsq} aria-hidden="true" />
        <div className={styles.fadeDir} aria-hidden="true" />

      </div>
    </section>
  )
}