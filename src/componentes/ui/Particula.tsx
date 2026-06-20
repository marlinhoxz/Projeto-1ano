"use client";

import { useEffect, useRef } from "react";
import styles from "./particula.module.css";

type Particula = {
  x: number;
  y: number;
  tamanho: number;
  velocidade: number;
  opacidade: number;
  drift: number;
};

export default function Particulas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particulasRef = useRef<Particula[]>([]);
  const animacaoRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const redimensionar = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const criarParticulas = () => {
      particulasRef.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        tamanho: Math.random() * 2 + 0.5,
        velocidade: Math.random() * 0.4 + 0.1,
        opacidade: Math.random() * 0.5 + 0.1,
        drift: (Math.random() - 0.5) * 0.3,
      }));
    };

    const animar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particulasRef.current.forEach((p) => {
        p.y -= p.velocidade;
        p.x += p.drift;

        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.tamanho, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacidade})`;
        ctx.fill();
      });

      animacaoRef.current = requestAnimationFrame(animar);
    };

    redimensionar();
    criarParticulas();
    animar();

    window.addEventListener("resize", redimensionar);

    return () => {
      window.removeEventListener("resize", redimensionar);
      cancelAnimationFrame(animacaoRef.current);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
  );
}
