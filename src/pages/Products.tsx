import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types/product";

interface OutletContext {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const Products = () => {
  const { onAddToCart, onQuickView } = useOutletContext<OutletContext>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    // Restore category from sessionStorage on mount
    const savedCategory = sessionStorage.getItem('productsSelectedCategory');
    return savedCategory || null;
  });

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    // Clear saved category when manually selecting
    if (category === null) {
      sessionStorage.removeItem('productsSelectedCategory');
    }
  };

  return (
    <main className="pt-16">
      <ProductGrid
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        showAllProducts={true}
      />
    </main>
  );
};

export default Products;
