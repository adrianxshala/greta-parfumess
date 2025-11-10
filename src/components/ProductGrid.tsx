import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  selectedCategory?: string | null;
  onCategorySelect?: (category: string | null) => void;
}

const categories = [
  { name: "All", value: null },
  { name: "Floral", value: "floral" },
  { name: "Woody", value: "woody" },
  { name: "Citrus", value: "citrus" },
  { name: "Oriental", value: "oriental" },
];

const ProductGrid = ({ onAddToCart, onQuickView, selectedCategory, onCategorySelect }: ProductGridProps) => {
  // Filter products by category if one is selected
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleCategoryClick = (categoryValue: string | null) => {
    onCategorySelect?.(categoryValue);
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Our Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted perfumes, each one a unique olfactory journey
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => handleCategoryClick(category.value)}
              size="sm"
              className={
                selectedCategory === category.value
                  ? "bg-primary hover:bg-primary/90 text-sm sm:text-base"
                  : "hover:bg-primary/10 text-sm sm:text-base"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
