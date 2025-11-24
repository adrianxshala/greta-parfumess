import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/services/products";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const loadProducts = async () => {
        setLoading(true);
        try {
          const data = await fetchProducts();
          setProducts(data);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };
      loadProducts();
    }
  }, [isOpen]);

  // Filter products by name (case-insensitive)
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase().trim();
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }, [query, products]);

  const handleProductClick = (productId: string) => {
    if (!productId) {
      return;
    }
    
    try {
      const encodedId = encodeURIComponent(String(productId).trim());
      navigate(`/product/${encodedId}`);
    } catch (error) {
    }
    onClose();
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <div className="glass-card m-4 rounded-3xl p-6 max-w-3xl mx-auto">
              <div className="flex items-center gap-4">
                <Search className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="Kërko parfume..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-lg"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {query && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-6 border-t"
                >
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <span className="ml-3 text-muted-foreground">Duke kërkuar...</span>
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'rezultat' : 'rezultate'} për "{query}"
                      </p>
                      <ScrollArea className="max-h-[400px]">
                        <div className="space-y-2">
                          {filteredProducts.map((product) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              whileHover={{ x: 4 }}
                              onClick={() => handleProductClick(product.id)}
                              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors group"
                            >
                              {product.image && product.image.trim() && (
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-transparent flex-shrink-0 flex items-center justify-center">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                      // Hide image if it fails to load
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {product.category}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-lg">€{product.price.toFixed(2)}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Nuk u gjetën rezultate për "{query}"
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
