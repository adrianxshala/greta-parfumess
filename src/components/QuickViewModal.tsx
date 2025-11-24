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
          <div className="fixed inset-0 flex items-center justify-center z-50 p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-background rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl"
            >
              <div className="p-4 sm:p-6 md:p-8">
                {/* Header with close button */}
                <div className="flex justify-between items-start mb-4 sm:mb-6 gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-primary font-medium uppercase tracking-wider mb-1 sm:mb-2">
                      {product.category}
                    </p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2 sm:mb-4">
                      {product.name}
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/80 backdrop-blur-sm h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>

                {/* Product Image */}
                {product.image && product.image.trim() && (
                  <div className="mb-4 sm:mb-6">
                    <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-transparent flex items-center justify-center">
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
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-4 sm:gap-6 max-w-2xl">
                  <div>
                    <p className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">€{product.price}</p>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Scent Notes - Only show if notes exist */}
                  {product.notes && product.notes.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Notat e Aromës</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.notes.map((note) => (
                          <span
                            key={note}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-muted rounded-full text-xs sm:text-sm font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto space-y-2 sm:space-y-3 pt-2">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 hover-glow h-12 sm:h-14 text-base sm:text-lg font-semibold"
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Shto në Shportë
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Transport falas për porosi mbi €150
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
