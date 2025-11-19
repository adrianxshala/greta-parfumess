import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/services/products";
import { Loader2, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  selectedCategory?: string | null;
  onCategorySelect?: (category: string | null) => void;
  showAllProducts?: boolean; // When true, show all products without limit and hide "View All" button
}

const categories = [
  { name: "All", value: null },
  { name: "Men", value: "men" },
  { name: "Woman", value: "woman" },
  { name: "Luxury Line", value: "luxury-line" },
  { name: "Unisex", value: "unisex" },
  { name: "Kids", value: "kids" },
];

const ProductGrid = ({ onAddToCart, onQuickView, selectedCategory, onCategorySelect, showAllProducts = false }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const PRODUCT_LIMIT = 6; // Show only 6 products when "All" is selected

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

  // Limit products when "All" is selected (only if not showing all products)
  const displayedProducts = (!selectedCategory && !showAllProducts)
    ? filteredProducts.slice(0, PRODUCT_LIMIT)
    : filteredProducts;

  // Check if there are more products to show (only if not showing all products)
  const hasMoreProducts = !showAllProducts && !selectedCategory && filteredProducts.length > PRODUCT_LIMIT;

  const handleCategoryClick = (categoryValue: string | null) => {
    onCategorySelect?.(categoryValue);
  };

  const handleViewAll = () => {
    navigate("/products");
  };

  return (
    <section id="products" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background via-primary/5 to-muted/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-primary/5 blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12 space-y-4 sm:space-y-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block mb-2"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block"
            >
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary/60" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent"
          >
            Koleksioni Ynë
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2 leading-relaxed"
          >
            Zbuloni parfumet tona të punuara me dorë, secili një udhëtim unik olfaktor ✨
          </motion.p>
        </motion.div>

        {/* Category Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.7 + (index * 0.1), 
                duration: 0.6, 
                ease: "easeOut",
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => handleCategoryClick(category.value)}
                size="sm"
                className={
                  selectedCategory === category.value
                    ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-xs sm:text-sm h-10 sm:h-11 px-5 sm:px-7 whitespace-nowrap transition-all rounded-full shadow-lg shadow-primary/30 font-medium"
                    : "hover:bg-primary/10 hover:border-primary/30 text-xs sm:text-sm h-10 sm:h-11 px-5 sm:px-7 whitespace-nowrap transition-all rounded-full border-2 backdrop-blur-sm"
                }
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Duke ngarkuar produktet...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive text-lg mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Provo Përsëri
            </Button>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nuk u gjetën produkte në këtë kategori.</p>
          </div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
            >
              {displayedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, filter: "blur(15px)", scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.8,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                  />
                </motion.div>
              ))}
            </motion.div>
            
            {/* View All Products Button - Only show when "All" is selected and there are more products */}
            {hasMoreProducts && (
              <motion.div 
                initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="flex justify-center mt-10 sm:mt-14"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    onClick={handleViewAll}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white hover-glow h-14 sm:h-16 px-10 sm:px-12 text-base sm:text-lg font-semibold transition-all rounded-full shadow-xl shadow-primary/30 group"
                  >
                    Shiko Të Gjitha Produktet
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
