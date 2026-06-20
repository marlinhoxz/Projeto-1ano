"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { momentosSurpresa, type MomentoSurpresa } from "./dados-momentos-surpresa"
import { useGalaxiaAmor } from "./useGalaxiaAmor"
import styles from "./TelaSurpresa.module.css"

export default function TelaSurpresa() {
  const cenaRef = useRef<HTMLDivElement>(null)
  const cabecalhoRef = useRef<HTMLDivElement>(null)
  const [momentoAtivo, setMomentoAtivo] = useState<MomentoSurpresa | null>(null)
  const [visitados, setVisitados] = useState<Set<string>>(new Set())

  const selecionarMomento = useCallback((momento: MomentoSurpresa) => {
    setMomentoAtivo(momento)
    setVisitados((prev) => new Set(prev).add(momento.id))
  }, [])

  useGalaxiaAmor(cenaRef, {
    momentos: momentosSurpresa,
    onSelecionar: selecionarMomento,
  })

  useEffect(() => {
    const cabecalho = cabecalhoRef.current
    if (!cabecalho) return

    const ctx = gsap.context(() => {
      gsap.from("[data-hd]", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.4,
      })
    }, cabecalho)

    return () => ctx.revert()
  }, [])

  const fecharPainel = () => setMomentoAtivo(null)

  const indiceAtivo = momentoAtivo
    ? momentosSurpresa.findIndex((m) => m.id === momentoAtivo.id)
    : -1

  const irPara = (offset: number) => {
    if (indiceAtivo < 0) return
    const prox =
      momentosSurpresa[
        (indiceAtivo + offset + momentosSurpresa.length) %
          momentosSurpresa.length
      ]
    selecionarMomento(prox)
  }

  return (
    <section className={styles.tela} aria-label="Surpresa final">
      <div ref={cenaRef} className={styles.cena} aria-hidden="true" />

      <div ref={cabecalhoRef} className={styles.cabecalho}>
        <p className={styles.subtitulo} data-hd>
          um ano ao seu lado
        </p>
        <h1 className={styles.titulo} data-hd>
          galaxia de nós
        </h1>
        <div className={styles.linhaOuro} data-hd aria-hidden="true" />
        <p className={styles.instrucao} data-hd>
          toque nas fotos ou frases
        </p>
      </div>

      <div className={styles.progresso} aria-label="Momentos explorados">
        {momentosSurpresa.map((m) => (
          <span
            key={m.id}
            className={`${styles.ponto} ${visitados.has(m.id) ? styles.pontoAtivo : ""}`}
          />
        ))}
      </div>

      <p className={styles.hint}>arraste · role · explore o coração</p>

      {momentoAtivo && (
        <div
          className={styles.painel}
          role="dialog"
          aria-modal="true"
          aria-label={momentoAtivo.titulo}
          onClick={fecharPainel}
        >
          <article
            className={styles.cartao}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.fechar}
              onClick={fecharPainel}
              aria-label="Fechar momento"
            >
              ×
            </button>

            <div className={styles.navegacao}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => irPara(-1)}
                aria-label="Momento anterior"
              >
                ←
              </button>
              <span className={styles.contador}>
                {String(indiceAtivo + 1).padStart(2, "0")} /{" "}
                {String(momentosSurpresa.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => irPara(1)}
                aria-label="Próximo momento"
              >
                →
              </button>
            </div>

            <div className={styles.fotoWrap}>
              <Image
                src={momentoAtivo.foto}
                alt={momentoAtivo.titulo}
                width={900}
                height={1200}
                className={styles.foto}
                sizes="(max-width: 640px) 92vw, 520px"
              />
            </div>

            <div className={styles.textosCartao}>
              <h2 className={styles.tituloCartao}>{momentoAtivo.titulo}</h2>
              <p className={styles.descricaoCartao}>{momentoAtivo.descricao}</p>
            </div>
          </article>
        </div>
      )}
    </section>
  )
}
