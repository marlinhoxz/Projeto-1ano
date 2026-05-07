export type ItemGaleria = {
  id: number
  srcFoto: string
  altFoto: string
  legenda: string
}

export const itensGaleria: ItemGaleria[] = [
  {
    id: 1,
    srcFoto: "/fotos/foto-1.jpg", // substitua pelo caminho real
    altFoto: "Nossa primeira foto juntos",
    legenda: "O começo de tudo",
  },
  {
    id: 2,
    srcFoto: "/fotos/foto-2.jpg",
    altFoto: "Um momento especial",
    legenda: "Cada instante com você",
  },
  {
    id: 3,
    srcFoto: "/fotos/foto-3.jpg",
    altFoto: "Nossa história",
    legenda: "Um ano de nós",
  },
]
