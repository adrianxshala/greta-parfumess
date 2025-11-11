import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/services/products";
import { Loader2 } from "lucide-react";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products by category if one is selected
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleCategoryClick = (categoryValue: string | null) => {
    onCategorySelect?.(categoryValue);
  };

  return (
    <section id="products" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold">Our Collection</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Discover our handcrafted perfumes, each one a unique olfactory journey
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8 md:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => handleCategoryClick(category.value)}
              size="sm"
              className={
                selectedCategory === category.value
                  ? "bg-primary hover:bg-primary/90 text-xs sm:text-sm h-9 sm:h-10 px-4 sm:px-6 whitespace-nowrap"
                  : "hover:bg-primary/10 text-xs sm:text-sm h-9 sm:h-10 px-4 sm:px-6 whitespace-nowrap"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading products...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive text-lg mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
