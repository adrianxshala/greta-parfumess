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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
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
