import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "@/services/products";
import { Product } from "@/types/product";

// Featured product names to display
const featuredProductNames = [
  "Acqua di Gioia – Armani",
  "Chloe – Chloe",
  "Omnia Amethyste – Bulgaria"
];

const FeaturedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        
        // Filter products by name (case-insensitive partial match)
        const filtered = featuredProductNames
          .map(name => {
            // Find product that matches the name (allowing for variations)
            return allProducts.find(product => {
              const productName = product.name.toLowerCase().trim();
              const searchName = name.toLowerCase().trim();
              
              // Try exact match first
              if (productName === searchName) return true;
              
              // Try partial match - check if key parts match
              // Extract main name parts (before "–" or "-")
              const productMain = productName.split(/[–-]/)[0].trim();
              const searchMain = searchName.split(/[–-]/)[0].trim();
              
              if (productMain.includes(searchMain) || searchMain.includes(productMain)) {
                return true;
              }
              
              // Check if product name contains the search name or vice versa
              return productName.includes(searchName) || searchName.includes(productName);
            });
          })
          .filter((product): product is Product => product !== undefined);
        
        setFeaturedProducts(filtered);
      } catch (error) {
        // Silent fail - will show empty state
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const handleShopNow = () => {
    if (featuredProducts[currentIndex]) {
      const product = featuredProducts[currentIndex];
      const encodedId = encodeURIComponent(product.id);
      navigate(`/product/${encodedId}`);
    }
  };

  // Don't render if loading or no products
  if (loading || featuredProducts.length === 0) {
    return null;
  }

  const current = featuredProducts[currentIndex];

  return (
    <section id="featured" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Featured Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked exclusives and bestsellers
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              {/* Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-transparent flex items-center justify-center">
                  {current.image ? (
                    <img
                      src={current.image}
                      alt={current.name}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                </div>
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl -z-10 rounded-full" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    {current.name}
                  </h3>
                  {current.description && (
                    <p className="text-lg text-muted-foreground">
                      {current.description}
                    </p>
                  )}
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">€{current.price.toFixed(2)}</span>
                  <span className="text-muted-foreground">35ml</span>
                </div>

                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 hover-glow"
                  onClick={handleShopNow}
                >
                  Shop Now
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full hover-glow"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full hover-glow"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
