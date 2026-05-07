"use client"

import { useRef } from "react"
import { itensGaleria } from "./dados-galeria"
import ItemFoto from "./ItemFoto"
import styles from "./TelaGaleria.module.css"


const ALTURA_POR_ITEM = 480

type PropsTelaGaleria = {
  aoAvancarParaSegundaCarta: () => void
}

export default function TelaGaleria({ aoAvancarParaSegundaCarta }: PropsTelaGaleria) {
  const secaoRef = useRef<HTMLElement>(null)
  const alturaGaleria = itensGaleria.length * ALTURA_POR_ITEM

  return (
    <section ref={secaoRef} className={styles.tela} aria-label="Galeria de fotos">
    
      <header className={styles.cabecalho}>
        <p className={styles.subtitulo}>um ano de memórias</p>
        <h2 className={styles.titulo}>as nossas histórias</h2>
      </header>

      
      <div className={styles.areaGaleria} style={{ minHeight: alturaGaleria }}>
       

        <div className={styles.listaFotos}>
          {itensGaleria.map((item, indice) => (
            <ItemFoto key={item.id} item={item} indice={indice} />
          ))}
        </div>
      </div>

   
      <footer className={styles.rodape}>
        <p className={styles.textoRodape}>ainda tem mais...</p>
        <button
          className={styles.botaoContinuar}
          onClick={aoAvancarParaSegundaCarta}
          aria-label="Ver a carta final"
        >
          <span className={styles.setaBaixo} aria-hidden="true">↓</span>
          continuar
        </button>
      </footer>
    </section>
  )
}
