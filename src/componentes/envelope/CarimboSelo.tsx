"use client"

import styles from "./carimbo.module.css"

type PropsCarimboSelo = {
  aoClicar: () => void
  tamanho?: "normal" | "grande"
  titulo?: string
}

export default function CarimboSelo({
  aoClicar,
  tamanho = "normal",
  titulo = "Abrir carta",
}: PropsCarimboSelo) {
  return (
    <button
      className={`${styles.carimbo} ${styles[tamanho]}`}
      onClick={aoClicar}
      aria-label={titulo}
      title={titulo}
    >
      <div className={styles.circuoExterno}>
        <div className={styles.circuloInterno}>
          <svg
            viewBox="0 0 60 60"
            className={styles.icone}
            aria-hidden="true"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fontSize="28"
              fill="currentColor"
              fontFamily="serif"
            >
              ♥
            </text>
          </svg>
        </div>
      </div>
      <span className={styles.textoClick}>clique aqui</span>
    </button>
  )
}
