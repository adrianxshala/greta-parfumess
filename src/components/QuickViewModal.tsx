import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal = ({ product, onClose, onAddToCart }: QuickViewModalProps) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-background rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
                {/* Image */}
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                    onClick={onClose}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
                      {product.category}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                      {product.name}
                    </h2>
                    <p className="text-2xl font-semibold mb-4">${product.price}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Scent Notes</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.map((note) => (
                        <span
                          key={note}
                          className="px-4 py-2 bg-muted rounded-full text-sm font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto space-y-3">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 hover-glow"
                      size="lg"
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Free shipping on orders over $150
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
