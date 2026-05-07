export type ItemGaleria = {
  id: number
  srcFoto: string
  altFoto: string
  legenda: string
}

export const itensGaleria: ItemGaleria[] = [
  {
    id: 1,
    srcFoto: "/assets/InicioDeTudo.JPEG", 
    altFoto: "Nossa primeira foto juntos",
    legenda: "O começo de tudo",
  },
  {
    id: 2,
    srcFoto: "/assets/BeijoMontanha.JPEG",
    altFoto: "Um momento especial",
    legenda: "Cada instante com você",
  },
  {
    id: 3,
    srcFoto: "/assets/braçosaberto.JPEG",
    altFoto: "Nossa história",
    legenda: "Um ano de nós",
  },
]
