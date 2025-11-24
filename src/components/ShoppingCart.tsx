import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/product";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (
    id: string,
    quantity: number,
    selectedSize?: string
  ) => void;
  onRemove: (id: string, selectedSize?: string) => void;
  onCheckout: () => void;
}

const ShoppingCart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: ShoppingCartProps) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <div className="flex items-center gap-2 sm:gap-3">
                <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
                <h2 className="text-lg sm:text-xl font-serif font-semibold">
                  Shporta e Blerjeve
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 sm:h-11 sm:w-11"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <ScrollArea className="flex-1 p-4 sm:p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4">
                  <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/50 mb-4" />
                  <p className="text-base sm:text-lg font-medium mb-2">
                    Shporta juaj është e zbrazët
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Shtoni disa parfume për të filluar
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {items.map((item, index) => {
                    // Create unique key for items with same id but different sizes
                    const uniqueKey = item.selectedSize
                      ? `${item.id}-${item.selectedSize}-${index}`
                      : `${item.id}-${index}`;
                    return (
                      <motion.div
                        key={uniqueKey}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass-card"
                      >
                        <div className="flex-1 space-y-2 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm sm:text-base truncate">
                                {item.name}
                              </h3>
                              {item.selectedSize && (
                                <p className="text-xs text-primary font-medium mt-0.5">
                                  {item.selectedSize}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0"
                              onClick={() =>
                                onRemove(item.id, item.selectedSize)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground capitalize">
                            {item.category}
                          </p>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 sm:h-9 sm:w-9"
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.id,
                                    Math.max(0, item.quantity - 1),
                                    item.selectedSize
                                  )
                                }
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </Button>
                              <span className="w-8 sm:w-10 text-center font-medium text-sm sm:text-base">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 sm:h-9 sm:w-9"
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.id,
                                    item.quantity + 1,
                                    item.selectedSize
                                  )
                                }
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                            <p className="font-semibold text-sm sm:text-base whitespace-nowrap">
                              €{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 sm:p-6 space-y-3 sm:space-y-4 bg-background">
                <div className="flex justify-between text-base sm:text-lg font-semibold">
                  <span>Totali</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 hover-glow h-12 sm:h-14 text-base sm:text-lg font-semibold"
                  onClick={onCheckout}
                >
                  Porosit
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
