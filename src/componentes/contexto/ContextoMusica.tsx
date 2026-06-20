"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ContextoMusicaTipo = {
  tocando: boolean;
  alternarMusica: () => void;
  pronta: boolean;
};

const ContextoMusica = createContext<ContextoMusicaTipo | null>(null);

const CHAVE_PREFERENCIA = "musica-tocando";

export function ProvedorMusica({
  children,
  src,
}: {
  children: ReactNode;
  src: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [tocando, setTocando] = useState(false);
  const [pronta, setPronta] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.55;

    const aoCarregar = () => setPronta(true);
    audio.addEventListener("canplaythrough", aoCarregar);

    audioRef.current = audio;

    const preferenciaSalva = window.localStorage.getItem(CHAVE_PREFERENCIA);
    if (preferenciaSalva === "true") {
      audio
        .play()
        .then(() => setTocando(true))
        .catch(() => {
          setTocando(false);
        });
    }

    return () => {
      audio.removeEventListener("canplaythrough", aoCarregar);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const alternarMusica = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (tocando) {
      audio.pause();
      setTocando(false);
      window.localStorage.setItem(CHAVE_PREFERENCIA, "false");
    } else {
      audio
        .play()
        .then(() => {
          setTocando(true);
          window.localStorage.setItem(CHAVE_PREFERENCIA, "true");
        })
        .catch(() => {
          setTocando(false);
        });
    }
  };

  return (
    <ContextoMusica.Provider value={{ tocando, alternarMusica, pronta }}>
      {children}
    </ContextoMusica.Provider>
  );
}

export function useMusica() {
  const ctx = useContext(ContextoMusica);
  if (!ctx) {
    throw new Error("useMusica precisa estar dentro de <ProvedorMusica>");
  }
  return ctx;
}
