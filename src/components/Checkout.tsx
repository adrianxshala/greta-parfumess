import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, MapPin, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CartItem } from "@/types/product";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { toast } from "sonner";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete?: () => void;
}

const Checkout = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}: CheckoutProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "38349153002"; // +383 49 153 002 without + and spaces

    // Clean and professional order message
    let orderMessage = `*POROSI E RE*\n\n`;

    // Customer Information
    orderMessage += `${formData.fullName}\n`;
    orderMessage += `${formData.phone}\n`;
    orderMessage += `${formData.address}, ${formData.city}\n`;
    if (formData.notes && formData.notes.trim()) {
      orderMessage += `${formData.notes}\n`;
    }

    // Products
    orderMessage += `\n*Artikujt:*\n`;
    items.forEach((item) => {
      const sizeText = item.selectedSize ? ` ${item.selectedSize}` : "";
      orderMessage += `${item.name}${sizeText} - ${item.quantity}×€${item.price.toFixed(2)}\n`;
    });

    // Total
    orderMessage += `\n*Totali: €${total.toFixed(2)}*\n`;
    orderMessage += `Pagesë në Dorëzim\n\n`;
    orderMessage += `Ju lutem konfirmoni porosinë.`;

    const message = encodeURIComponent(orderMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Use window.location.href to open directly in WhatsApp without popup dialog
    // This works better on mobile (opens app) and desktop (opens WhatsApp Web)
    // No popup blocker issues and no permission dialog
    window.location.href = whatsappUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Open WhatsApp IMMEDIATELY from user interaction (before any async operations)
    // This prevents popup blockers from blocking the window.open() call
    handleWhatsAppOrder();
    
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Order placed successfully!");

    // Clear cart after order is placed
    if (onOrderComplete) {
      onOrderComplete();
    }

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        notes: "",
      });
      onClose();
    }, 3000);
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Checkout Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-2xl bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-serif font-semibold">
                Checkout
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 sm:h-11 sm:w-11"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {isSuccess ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-serif font-semibold">
                  Order Placed!
                </h3>
                <p className="text-muted-foreground">
                  Your order will be delivered soon. Please have cash ready for
                  payment.
                </p>
              </motion.div>
            ) : (
              <ScrollArea className="flex-1">
                <form
                  onSubmit={handleSubmit}
                  className="p-4 sm:p-6 space-y-6 sm:space-y-8"
                >
                  {/* Customer Information */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <h3 className="text-base sm:text-lg font-serif font-semibold">
                        Customer Information
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="text-sm sm:text-base"
                      >
                        Emri i Plotë *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Greta Parfume "
                        className="glass-card h-11 sm:h-12 text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm sm:text-base">
                        Numri i Telefonit *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+383 49 123 123"
                        className="glass-card h-11 sm:h-12 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <h3 className="text-base sm:text-lg font-serif font-semibold">
                        Delivery Address
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm sm:text-base">
                        Adresa *
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="Emri i rrugës"
                        className="glass-card h-11 sm:h-12 text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm sm:text-base">
                        Qyteti *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Kosovë-Prishtinë"
                        className="glass-card h-11 sm:h-12 text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm sm:text-base">
                        Shënime për Dorëzimin (Opsionale)
                      </Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Udhëzime të veçanta për dorëzimin..."
                        className="glass-card min-h-[80px] text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <h3 className="text-base sm:text-lg font-serif font-semibold">
                        Payment Method
                      </h3>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-3 sm:p-4 rounded-xl glass-card border-2 border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        <span className="font-semibold text-sm sm:text-base">
                          Cash on Delivery
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                        Pagesë në dorëzim
                      </p>
                    </motion.div>
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-4 p-4 sm:p-6 rounded-xl glass-card">
                    <h3 className="text-base sm:text-lg font-serif font-semibold mb-3 sm:mb-4">
                      Order Summary
                    </h3>

                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity} × €{item.price}
                            </p>
                          </div>
                          <p className="font-semibold">
                            €{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>€{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-primary font-medium">Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                        <span>Total</span>
                        <span>€{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 hover-glow h-12 sm:h-14 text-base sm:text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Duke përpunuar...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-5 w-5" />
                        Vendos Porosinë (Pagesë në Dorëzim)
                      </>
                    )}
                  </Button>
                </form>
              </ScrollArea>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Checkout;
