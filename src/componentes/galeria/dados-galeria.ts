export type ItemGaleria = {
  id: number;
  srcFoto: string;
  altFoto: string;
  legenda: string;
};

export const itensGaleria: ItemGaleria[] = [
  {
    id: 1,
    srcFoto: "/assets/primeirorole.webp",
    altFoto: "Nossa primeira foto juntos",
    legenda: "O começo de tudo",
  },
  {
    id: 2,
    srcFoto: "/assets/BeijoMontanha.webp",
    altFoto: "Um momento especial",
    legenda: "Cada instante com você é perfeito",
  },
  {
    id: 3,
    srcFoto: "/assets/braçosaberto.webp",
    altFoto: "Nossa história",
    legenda: "Um ano de nós",
  },
];
