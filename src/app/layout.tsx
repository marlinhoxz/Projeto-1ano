import type { ReactNode } from "react";
import { ProvedorMusica } from "@/componentes/contexto/ContextoMusica";
import PlayerMusica from "@/componentes/ui/PlayerMusica";
import ProvedorScrollSuave from "@/componentes/contexto/ProvedorScrollSuave";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ProvedorScrollSuave>
          <ProvedorMusica src="/assets/audio/nossa-musica.mp3">
            <PlayerMusica />
            {children}
          </ProvedorMusica>
        </ProvedorScrollSuave>
      </body>
    </html>
  );
}
