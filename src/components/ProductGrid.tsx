import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import perfume1 from "@/assets/perfume-1.jpg";
import perfume2 from "@/assets/perfume-2.jpg";
import perfume3 from "@/assets/perfume-3.jpg";
import perfume4 from "@/assets/perfume-4.jpg";

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const products: Product[] = [
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

const ProductGrid = ({ onAddToCart, onQuickView }: ProductGridProps) => {
  return (
    <section id="products" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Our Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted perfumes, each one a unique olfactory journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
