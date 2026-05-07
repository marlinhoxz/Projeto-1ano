"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { useRouter } from "next/navigation"
import CarimboSelo from "@/componentes/envelope/CarimboSelo"
import LacoDecorativo from "./LacoDecorativo"
import styles from "./TelaSegundaCarta.module.css"


const TEXTO_SEGUNDA_CARTA = {
  mensagem: [
    "Espero que todos os seus sonhos se realizem,",
    "porque os meus já se realizaram quando te encontrei.",
  ],
  felicitacao: "Feliz aniversário de 1 ano,",
  assinatura: "meu amor.",
}

export default function TelaSegundaCarta() {
  const router = useRouter()
  const telaRef = useRef<HTMLElement>(null)
  const envelopeRef = useRef<HTMLDivElement>(null)
  const carimboRef = useRef<HTMLDivElement>(null)
  const conteudoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tela = telaRef.current
    const conteudo = conteudoRef.current
    if (!tela || !conteudo) return

    
    gsap.fromTo(
      conteudo,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    )
  }, [])

  const animarSaidaENavegar = () => {
    const tela = telaRef.current
    const envelope = envelopeRef.current
    const carimbo = carimboRef.current
    if (!tela || !envelope || !carimbo) return

    const linha = gsap.timeline({
      onComplete: () => router.push("/surpresa"),
    })

    linha.to(envelope, {
      scale: 1.15,
      duration: 0.35,
      ease: "power2.out",
    })

    
    linha.to(
      carimbo,
      {
        scale: 1.3,
        duration: 0.25,
        ease: "back.out(2)",
      },
      "-=0.1"
    )

    linha.to(
      envelope,
      {
        scale: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power3.in",
      },
      "+=0.1"
    )

    linha.to(
      tela,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.4"
    )
  }

  return (
    <section ref={telaRef} className={styles.tela} aria-label="Carta final">
      <div ref={conteudoRef} className={styles.conteudo}>
      
        <div ref={envelopeRef} className={styles.areaEnvelope}>
          <div className={styles.envelopeAberto}>
            <div className={styles.abaEnvelope} aria-hidden="true" />
            <div className={styles.corpoEnvelope}>
              <div ref={carimboRef} className={styles.posicaoCarimbo}>
                <CarimboSelo
                  aoClicar={animarSaidaENavegar}
                  tamanho="grande"
                  titulo="Ver a surpresa final"
                />
              </div>
            </div>
          </div>
        </div>

    
        <div className={styles.areaMensagem}>
          {TEXTO_SEGUNDA_CARTA.mensagem.map((linha, indice) => (
            <p key={indice} className={styles.linhaMensagem}>
              {linha}
            </p>
          ))}

          <p className={styles.felicitacao}>{TEXTO_SEGUNDA_CARTA.felicitacao}</p>
          <p className={styles.assinatura}>{TEXTO_SEGUNDA_CARTA.assinatura}</p>
        </div>

        
        <div className={styles.areaLaco}>
          <LacoDecorativo />
        </div>
      </div>
    </section>
  )
}
