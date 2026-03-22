export interface SamplePainting {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  priceUSD: number;
  dimensions: string;
  material: string;
}

export const samplePaintings: SamplePainting[] = [
  {
    id: 1,
    title: "Lotus at Twilight",
    description:
      "A meditative exploration of stillness, this painting captures a lotus pond at the magical hour when day surrenders to dusk. The reflections dance between worlds — the tangible and the ephemeral — in rich purples and warm golds.",
    imageUrl: "/assets/generated/painting-lotus-pond.dim_600x700.jpg",
    priceUSD: 1800,
    dimensions: '24" × 30"',
    material: "Oil on Canvas",
  },
  {
    id: 2,
    title: "Himalayan Dawn",
    description:
      "The first light of morning kisses the ancient peaks, painting them in gold and rose. This piece invites the viewer into a moment of profound silence — where earth meets sky and the human spirit finds its scale.",
    imageUrl: "/assets/generated/painting-himalayan-dawn.dim_600x700.jpg",
    priceUSD: 2400,
    dimensions: '36" × 24"',
    material: "Oil on Canvas",
  },
  {
    id: 3,
    title: "Woman in the Garden",
    description:
      "An ode to grace and presence. A woman in a vivid saree stands among blooms, her posture a quiet declaration of belonging. The warm palette celebrates the beauty of being rooted in one's world.",
    imageUrl: "/assets/generated/painting-woman-garden.dim_600x700.jpg",
    priceUSD: 2100,
    dimensions: '20" × 28"',
    material: "Acrylic on Canvas",
  },
  {
    id: 4,
    title: "Monsoon Evening",
    description:
      "Rain transforms an Indian village into poetry. Lanterns blur through curtains of water, and the earth exhales the scent of petrichor. This watercolor captures the tender melancholy of a monsoon dusk.",
    imageUrl: "/assets/generated/painting-monsoon-village.dim_600x700.jpg",
    priceUSD: 1500,
    dimensions: '18" × 24"',
    material: "Watercolor on Paper",
  },
  {
    id: 5,
    title: "Embers & Gold",
    description:
      "An abstract meditation on creative fire — the uncontrollable energy that lies at the heart of all making. Impasto strokes of saffron and crimson pulse against a deep field, suggesting both destruction and birth.",
    imageUrl: "/assets/generated/painting-abstract-fire.dim_600x700.jpg",
    priceUSD: 3200,
    dimensions: '30" × 40"',
    material: "Oil on Canvas (Impasto)",
  },
  {
    id: 6,
    title: "Ganga at Sunrise",
    description:
      "The ancient ghats hold centuries of devotion. This painting depicts the sacred hour when pilgrims descend to the river and the world pauses. Ochre mist, warm stone, and the timeless flow of holy water.",
    imageUrl: "/assets/generated/painting-ganges-ghat.dim_600x700.jpg",
    priceUSD: 2800,
    dimensions: '36" × 30"',
    material: "Oil on Canvas",
  },
  {
    id: 7,
    title: "The Courtyard of Dreams",
    description:
      "Inspired by the latticed arches of Rajasthani havelis, this painting invites the eye through layers of architectural beauty. Bougainvillea cascades over pale stone while the air shimmers with memory and longing.",
    imageUrl: "/assets/generated/painting-rajasthan-palace.dim_600x700.jpg",
    priceUSD: 3600,
    dimensions: '40" × 30"',
    material: "Pastel on Board",
  },
];
