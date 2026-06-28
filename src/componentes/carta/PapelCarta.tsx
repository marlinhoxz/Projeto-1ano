import BatomDecorativo from "./BatomDecorativo";
import styles from "./papelcarta.module.css";

const TEXTO_CARTA = {
  saudacao: "Para a minha pessoa favorita,",
  paragrafos: [
    "Eu sei que o dia corre, o tempo voa, e nem sempre eu digo o que devia dizer. Mas no meio de qualquer confusão, a melhor parte do meu dia é você.",
    "Obrigado por ser o meu porto seguro, a calmaria que zera toda a minha pressa. Você é o meu riso mais frouxo e puro, a nossa aventura que nunca cessa.",
    "Um ano se passou desde o primeiro passo, dois corações diferentes no mesmo compasso. E olhando pra trás, pra tudo o que a gente já foi, eu só quero o futuro que a gente constrói.",
    "Por tudo o que fomos, por tudo o que somos, e pelas memórias que a vida ainda vai nos dar. Seja onde for, contanto que juntos, é do teu lado que eu sempre quero estar."
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
