import CarimboSelo from "@/componentes/envelope/CarimboSelo"
import styles from "./envelope.module.css"

type PropsEnvelopeInferior = {
  aoAvancar: () => void
}

export default function EnvelopeInferior({ aoAvancar }: PropsEnvelopeInferior) {
  return (
    <div className={styles.container}>
      <div className={styles.envelope}>
        
        <div className={styles.aba} aria-hidden="true" />

        
        <div className={styles.corpo}>
          <div className={styles.dobras} aria-hidden="true">
            <div className={styles.dobraEsq} />
            <div className={styles.dobraDir} />
            <div className={styles.dobraInf} />
          </div>

          <div className={styles.seloContainer}>
            <CarimboSelo
              aoClicar={aoAvancar}
              tamanho="grande"
              titulo="Continuar para a próxima surpresa"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
