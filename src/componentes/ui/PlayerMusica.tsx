"use client";

import { useMusica } from "@/componentes/contexto/ContextoMusica";
import styles from "./playermusica.module.css";

export default function PlayerMusica() {
  const { tocando, alternarMusica } = useMusica();

  return (
    <button
      type="button"
      onClick={alternarMusica}
      className={styles.botao}
      aria-label={tocando ? "Pausar música" : "Tocar música"}
      aria-pressed={tocando}
    >
      <span className={styles.icone} aria-hidden="true">
        {tocando ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M7 4.5v15l13-7.5-13-7.5z" />
          </svg>
        )}
      </span>
      <span className={styles.barras} aria-hidden="true">
        <i className={tocando ? styles.animada : ""} />
        <i className={tocando ? styles.animada : ""} />
        <i className={tocando ? styles.animada : ""} />
      </span>
    </button>
  );
}
