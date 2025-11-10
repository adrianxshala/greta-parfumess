import { Product } from "@/types/product";
import perfume1 from "@/assets/perfume-1.jpg";
import perfume2 from "@/assets/perfume-2.jpg";
import perfume3 from "@/assets/perfume-3.jpg";
import perfume4 from "@/assets/perfume-4.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Rose Éternelle",
    price: 189,
    image: perfume1,
    category: "floral",
    notes: ["Rose", "Jasmine", "Vanilla"],
    description: "A timeless bouquet of fresh roses with subtle vanilla undertones. Perfect for romantic evenings.",
  },
  {
    id: "2",
    name: "Lavande Noir",
    price: 165,
    image: perfume2,
    category: "floral",
    notes: ["Lavender", "Musk", "Amber"],
    description: "Dark lavender meets mysterious musk in this sophisticated evening fragrance.",
  },
  {
    id: "3",
    name: "Citrus Lumière",
    price: 149,
    image: perfume3,
    category: "citrus",
    notes: ["Bergamot", "Lemon", "Cedar"],
    description: "Bright citrus notes with woody base create an energizing daytime scent.",
  },
  {
    id: "4",
    name: "Bois Mystique",
    price: 199,
    image: perfume4,
    category: "woody",
    notes: ["Sandalwood", "Oud", "Leather"],
    description: "Deep woody notes with exotic oud create a powerful, masculine fragrance.",
  },
  {
    id: "5",
    name: "Jardin Secret",
    price: 175,
    image: perfume1,
    category: "floral",
    notes: ["Peony", "Gardenia", "White Tea"],
    description: "A secret garden captured in a bottle. Fresh, delicate, and unforgettable.",
  },
  {
    id: "6",
    name: "Ambre Soleil",
    price: 185,
    image: perfume3,
    category: "oriental",
    notes: ["Amber", "Patchouli", "Honey"],
    description: "Warm amber and sweet honey create a sensual oriental masterpiece.",
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

