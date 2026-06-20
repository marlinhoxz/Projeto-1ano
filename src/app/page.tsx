"use client";

import { useState } from "react";
import type { EstadoDaTela } from "@/componentes/tipos/global";
import EnvelopeInicial from "@/componentes/envelope/EnvelopeInicial";
import TelaGaleria from "@/componentes/galeria/TelaGaleria";
import TelaSegundaCarta from "@/componentes/segunda-carta/TelaSegundaCarta";
import styles from "./page.module.css";
import TelaCarta from "@/componentes/carta/TelaCarta";
import Particulas from "@/componentes/ui/Particula";

export default function PaginaPrincipal() {
  const [estadoAtual, setEstadoAtual] = useState<EstadoDaTela>("inicial");

  const irParaCartaAberta = () => setEstadoAtual("carta-aberta");
  const irParaGaleria = () => setEstadoAtual("galeria");
  const irParaSegundaCarta = () => setEstadoAtual("segunda-carta");

  return (
    <main className={styles.paginaPrincipal}>
      <Particulas />

      {estadoAtual === "inicial" && (
        <EnvelopeInicial aoAbrirCarta={irParaCartaAberta} />
      )}

      {estadoAtual === "carta-aberta" && (
        <TelaCarta aoAvancarParaGaleria={irParaGaleria} />
      )}

      {estadoAtual === "galeria" && (
        <TelaGaleria aoAvancarParaSegundaCarta={irParaSegundaCarta} />
      )}

      {estadoAtual === "segunda-carta" && <TelaSegundaCarta />}
    </main>
  );
}
