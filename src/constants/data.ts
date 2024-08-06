export const BEST_SELLERS: {
  id: number;
  image: string;
  price: string;
  salePrice?: string;
  name: string;
  category: string;
}[] = [
  {
    id: 1,
    name: "Growbox",
    price: "$ 963.85",
    image: "best-seller-1.png",
    category: "Dress",
  },
  {
    id: 2,
    name: "Töpfe",
    price: "$ 6130.00",
    image: "best-seller-2.png",
    category: "5 by 5 pots for planting",
  },
  {
    id: 3,
    name: "Lichthänger-Set",
    price: "$ 753.00",
    image: "best-seller-3.png",
    category: "Light-hanger set ",
  },
  {
    id: 4,
    name: "Licht",
    price: "$ 2364.00",
    salePrice: "$ 1155.00",
    image: "best-seller-4.png",
    category: "Dress",
  },
];

export const CATEGORIES = [
  {
    id: 1,
    name: "Beleuchtung",
    total: 30,
    image: "category-1.png",
  },
  {
    id: 2,
    name: "Dünger",
    total: 20,
    image: "category-2.png",
  },
  {
    id: 3,
    name: "Erde & Substrate",
    total: 20,
    image: "category-3.jpeg",
  },
  {
    id: 4,
    name: "Bewässerung",
    total: 20,
    image: "category-4.png",
  },
  {
    id: 5,
    name: "Töpfe & Behälter",
    total: 20,
    image: "category-5.png",
  },
  {
    id: 6,
    name: "Growbox",
    total: 20,
    image: "category-6.png",
  },
  {
    id: 7,
    name: "Pflanzen & Gärtnern",
    total: 30,
    image: "category-7.png",
  },
  {
    id: 8,
    name: "Lüftung & Klimaanlage",
    total: 20,
    image: "category-8.png",
  },
];
