import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import Newsletter from "@/components/Newsletter";
import { Product } from "@/types/product";

interface OutletContext {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const Index = () => {
  const { onAddToCart, onQuickView } = useOutletContext<OutletContext>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <main>
      <Hero />
      <ProductGrid
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <FeaturedCarousel />
      <Newsletter />
    </main>
  );
};

export default Index;
