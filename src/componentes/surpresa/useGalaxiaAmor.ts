"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { MomentoSurpresa } from "./dados-momentos-surpresa";
import { frasesAmbiente } from "./dados-momentos-surpresa";
import type { Object3D, Material } from "three";

type OpcoesGalaxia = {
  momentos: MomentoSurpresa[];
  onSelecionar: (momento: MomentoSurpresa) => void;
};

function pontoCoracao(t: number, escala: number) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);
  const profundidade = (Math.random() - 0.5) * 1.2;
  return {
    x: x * 0.11 * escala,
    y: y * 0.11 * escala + 3.4,
    z: profundidade,
  };
}

function direcaoSaida(t: number, escala: number) {
  const p = pontoCoracao(t, escala);
  const len = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z) || 1;
  return { x: p.x / len, y: p.y / len, z: p.z / len };
}

function pontoEspiral(indice: number, total: number) {
  const braco = indice % 3;
  const t = indice / total;
  const raio = 0.6 + t * 6.2;
  const angulo =
    t * Math.PI * 7 + (braco * (Math.PI * 2)) / 3 + Math.random() * 0.25;

  const dispersaoRaio = (Math.random() - 0.5) * (0.4 + t * 1.4);
  const r = raio + dispersaoRaio;

  const x = Math.cos(angulo) * r;
  const z = Math.sin(angulo) * r;
  const y = (Math.random() - 0.5) * (0.25 + (1 - t) * 0.5);

  return { x, y, z };
}

export function useGalaxiaAmor(
  containerRef: RefObject<HTMLDivElement | null>,
  { momentos, onSelecionar }: OpcoesGalaxia,
) {
  const onSelecionarRef = useRef(onSelecionar);
  onSelecionarRef.current = onSelecionar;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let animId = 0;
    let limpar: (() => void) | undefined;

    async function iniciar() {
      const THREE = await import("three");
      const { OrbitControls } =
        await import("three/addons/controls/OrbitControls.js");
      const { EffectComposer } =
        await import("three/addons/postprocessing/EffectComposer.js");
      const { RenderPass } =
        await import("three/addons/postprocessing/RenderPass.js");
      const { UnrealBloomPass } =
        await import("three/addons/postprocessing/UnrealBloomPass.js");
      const { CSS2DRenderer, CSS2DObject } =
        await import("three/addons/renderers/CSS2DRenderer.js");

      if (disposed || !containerRef.current) return;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x1a0003, 0.03);

      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        200,
      );
      camera.position.set(0, 3, 17);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 0.95;
      containerRef.current.appendChild(renderer.domElement);

      const labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = "absolute";
      labelRenderer.domElement.style.inset = "0";
      labelRenderer.domElement.style.pointerEvents = "none";
      containerRef.current.appendChild(labelRenderer.domElement);

      const galaxia = new THREE.Group();
      scene.add(galaxia);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.minDistance = 8;
      controls.maxDistance = 28;
      controls.enablePan = false;
      controls.maxPolarAngle = Math.PI * 0.85;
      controls.minPolarAngle = Math.PI * 0.15;
      controls.target.set(0, 1.0, 0);

      const totalDisco = 8600;
      const totalCoracao = 2200;
      const particulasTotal = totalDisco + totalCoracao;

      const posicoes = new Float32Array(particulasTotal * 3);
      const cores = new Float32Array(particulasTotal * 3);
      const alvos = new Float32Array(particulasTotal * 3);
      const ehCoracao = new Uint8Array(particulasTotal);

      for (let i = 0; i < totalDisco; i++) {
        const p = pontoEspiral(i, totalDisco);
        posicoes[i * 3] = (Math.random() - 0.5) * 0.6;
        posicoes[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
        posicoes[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
        alvos[i * 3] = p.x;
        alvos[i * 3 + 1] = p.y;
        alvos[i * 3 + 2] = p.z;

        const t = i / totalDisco;

        const dourado = t > 0.45 && Math.random() > 0.4;
        cores[i * 3] = dourado ? 0.92 : 0.85;
        cores[i * 3 + 1] = dourado ? 0.45 : 0.06;
        cores[i * 3 + 2] = dourado ? 0.32 : 0.18;
      }

      for (let j = 0; j < totalCoracao; j++) {
        const idx = totalDisco + j;
        const t = Math.random() * Math.PI * 2;
        const escala = 0.85 + Math.random() * 0.35;
        const p = pontoCoracao(t, escala);
        posicoes[idx * 3] = p.x + (Math.random() - 0.5) * 0.3;
        posicoes[idx * 3 + 1] = p.y + (Math.random() - 0.5) * 0.3;
        posicoes[idx * 3 + 2] = p.z;
        alvos[idx * 3] = p.x;
        alvos[idx * 3 + 1] = p.y;
        alvos[idx * 3 + 2] = p.z;
        ehCoracao[idx] = 1;

        cores[idx * 3] = 0.95;
        cores[idx * 3 + 1] = 0.12;
        cores[idx * 3 + 2] = 0.22;
      }

      const geoParticulas = new THREE.BufferGeometry();
      geoParticulas.setAttribute(
        "position",
        new THREE.BufferAttribute(posicoes, 3),
      );
      geoParticulas.setAttribute("color", new THREE.BufferAttribute(cores, 3));

      const matParticulas = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const nuvem = new THREE.Points(geoParticulas, matParticulas);
      galaxia.add(nuvem);

      const nucleo = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 48, 48),
        new THREE.MeshBasicMaterial({ color: 0xff2d55 }),
      );
      nucleo.scale.setScalar(0.001);
      galaxia.add(nucleo);

      const brilhoInterno = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 48, 48),
        new THREE.ShaderMaterial({
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.6);
              vec3 cor = mix(vec3(0.85, 0.05, 0.25), vec3(1.0, 0.4, 0.45), intensity);
              gl_FragColor = vec4(cor, 1.0) * (0.7 + intensity * 1.1);
            }
          `,
          side: THREE.FrontSide,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false,
        }),
      );
      brilhoInterno.scale.setScalar(0.001);
      galaxia.add(brilhoInterno);

      const brilhoNucleo = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 48, 48),
        new THREE.ShaderMaterial({
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
              gl_FragColor = vec4(0.92, 0.18, 0.32, 1.0) * intensity * 1.5;
            }
          `,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false,
        }),
      );
      brilhoNucleo.scale.setScalar(0.001);
      galaxia.add(brilhoNucleo);

      type FraseFlutuante = {
        el: HTMLButtonElement;
        objeto: Object3D;
        progresso: number;
        velocidade: number;
        angulo: number;
        elevacao: number;
        escala: number;
        distanciaBase: number;
        momento?: MomentoSurpresa;
      };

      const frases: FraseFlutuante[] = [];
      const TOTAL_ROTULOS_FIXOS = momentos.length + 14;

      function criarRotulo(
        texto: string,
        indice: number,
        totalRotulos: number,
        momento?: MomentoSurpresa,
      ) {
        const el = document.createElement("button");
        el.type = "button";
        el.textContent = texto;
        el.className = momento ? "galaxia-rotulo" : "galaxia-frase";
        el.style.pointerEvents = "auto";

        if (momento) {
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            onSelecionarRef.current(momento);
          });
        }

        const objeto = new THREE.Object3D();
        const label = new CSS2DObject(el);
        objeto.add(label);
        galaxia.add(objeto);

        const anguloBase = (indice / totalRotulos) * Math.PI * 2;
        const elevacao = ((indice * 0.61803) % 1) * Math.PI - Math.PI / 2;

        frases.push({
          el,
          objeto,
          progresso: Math.random(),
          velocidade: 0.0014 + Math.random() * 0.0016,
          angulo: anguloBase,
          elevacao,
          escala: 1.3 + Math.random() * 1.3,
          distanciaBase: 2.1 + (indice % 4) * 0.55,
          momento,
        });
      }

      momentos.forEach((m, i) =>
        criarRotulo(m.rotulo, i, TOTAL_ROTULOS_FIXOS, m),
      );
      for (let i = 0; i < 14; i++) {
        const frase = frasesAmbiente[i % frasesAmbiente.length];
        criarRotulo(frase, momentos.length + i, TOTAL_ROTULOS_FIXOS);
      }

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.55,
        0.5,
        0.35,
      );
      composer.addPass(bloom);

      const clock = new THREE.Clock();
      let formacao = 0;
      let entrada = 0;
      const easeOutBack = (x: number) => {
        const c1 = 1.4;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
      };

      const animar = () => {
        animId = requestAnimationFrame(animar);
        const tempo = clock.getElapsedTime();

        formacao = Math.min(1, formacao + 0.012);
        const posArr = geoParticulas.attributes.position.array as Float32Array;
        for (let i = 0; i < particulasTotal; i++) {
          const ix = i * 3;
          posArr[ix] += (alvos[ix] - posArr[ix]) * 0.04 * formacao;
          posArr[ix + 1] += (alvos[ix + 1] - posArr[ix + 1]) * 0.04 * formacao;
          posArr[ix + 2] += (alvos[ix + 2] - posArr[ix + 2]) * 0.04 * formacao;

          if (ehCoracao[i]) {
            posArr[ix + 1] += Math.sin(tempo * 1.4 + i * 0.02) * 0.0012;
          } else {
            posArr[ix + 1] += Math.sin(tempo * 0.8 + i * 0.01) * 0.0004;
          }
        }
        geoParticulas.attributes.position.needsUpdate = true;

        const pulso = 1 + Math.sin(tempo * 2.0) * 0.08;
        entrada = Math.min(1, entrada + 0.012);
        const escalaEntrada = easeOutBack(entrada);
        nucleo.scale.set(
          pulso * escalaEntrada,
          pulso * escalaEntrada,
          pulso * escalaEntrada,
        );
        brilhoInterno.scale.set(
          pulso * 1.15 * escalaEntrada,
          pulso * 1.15 * escalaEntrada,
          pulso * 1.15 * escalaEntrada,
        );
        brilhoNucleo.scale.set(
          pulso * 1.7 * escalaEntrada,
          pulso * 1.7 * escalaEntrada,
          pulso * 1.7 * escalaEntrada,
        );
        galaxia.rotation.y = tempo * 0.05;

        frases.forEach((frase) => {
          frase.progresso += frase.velocidade;
          if (frase.progresso > 1) {
            frase.progresso = 0;
          }

          const dist =
            frase.distanciaBase + frase.progresso * frase.escala * 3.0;

          const x = Math.cos(frase.angulo) * Math.cos(frase.elevacao) * dist;
          const y = Math.sin(frase.elevacao) * dist * 0.7 + 0.4;
          const z = Math.sin(frase.angulo) * Math.cos(frase.elevacao) * dist;

          frase.objeto.position.set(x, y, z);

          const opacidade =
            frase.progresso < 0.12
              ? frase.progresso / 0.12
              : frase.progresso > 0.82
                ? (1 - frase.progresso) / 0.18
                : 1;

          frase.el.style.opacity = String(
            Math.max(0, Math.min(1, opacidade * 0.92)),
          );
        });

        controls.update();
        composer.render();
        labelRenderer.render(scene, camera);
      };

      animar();

      const redimensionar = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        bloom.resolution.set(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", redimensionar);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", redimensionar);
        controls.dispose();
        composer.dispose();
        renderer.dispose();
        geoParticulas.dispose();
        matParticulas.dispose();
        nucleo.geometry.dispose();
        (nucleo.material as Material).dispose();
        brilhoInterno.geometry.dispose();
        (brilhoInterno.material as Material).dispose();
        brilhoNucleo.geometry.dispose();
        (brilhoNucleo.material as Material).dispose();
        frases.forEach((f) => f.el.remove());
        if (containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
        if (containerRef.current?.contains(labelRenderer.domElement)) {
          containerRef.current.removeChild(labelRenderer.domElement);
        }
      };
    }

    iniciar().then((fn) => {
      limpar = fn;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      limpar?.();
    };
  }, [containerRef, momentos]);
}
