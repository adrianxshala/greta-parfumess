import { useState, useEffect } from "react";
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

  // Restore scroll position when coming back from /products
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: 'instant'
        });
        sessionStorage.removeItem('homeScrollPosition');
      }, 100);
    }
  }, []);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <main>
      <Hero />
      <FeaturedCarousel />
      <ProductGrid
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <Newsletter />
    </main>
  );
};

export default Index;
