import BatomDecorativo from "./BatomDecorativo";
import styles from "./papelcarta.module.css";

// Texto editável — substitua pelo seu próprio
const TEXTO_CARTA = {
  saudacao: "Para a minha pessoa favorita,",
  paragrafos: [
    "Eu sei que nem sempre digo o quanto você significa para mim, mas você é a melhor parte de cada um dos meus dias.",
    "Obrigado por ser a minha paz, o meu riso e a minha maior aventura.",
    "Por um ano juntos e por todas as memórias que ainda vamos criar.",
  ],
  despedida: "Com todo o meu amor,",
};

export default function PapelCarta() {
  return (
    <article className={styles.papel} ariaa-label="Carta de aniversário">
      <div className={styles.bordaRasgadaSuperior} aria-hidden="true" />

      <div className={styles.conteudo}>
        <p className={styles.saudacao}>{TEXTO_CARTA.saudacao}</p>

        <div className={styles.corpoDaCarta}>
          {TEXTO_CARTA.paragrafos.map((paragrafo, indice) => (
            <p key={indice} className={styles.paragrafo}>
              {paragrafo}
            </p>
          ))}
        </div>

        <p className={styles.despedida}>{TEXTO_CARTA.despedida}</p>

        <div className={styles.areaBatom}>
          <BatomDecorativo />
        </div>
      </div>

      <div className={styles.bordaRasgadaInferior} aria-hidden="true" />
    </article>
  );
}
