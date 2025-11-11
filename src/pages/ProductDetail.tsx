import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Plus, Minus, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { fetchProductById } from "@/services/products";

interface OutletContext {
  cartItems: any[];
  onAddToCart: (product: Product | undefined, quantity?: number) => void;
  onCartOpen: () => void;
  cartItemCount: number;
  onSearchOpen: () => void;
}

const ProductDetail = () => {
  const { cartItems, onAddToCart, onCartOpen, cartItemCount, onSearchOpen } = useOutletContext<OutletContext>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product. Please try again later.");
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 pt-20">
        <h2 className="text-2xl font-serif font-semibold">Product Not Found</h2>
        <p className="text-muted-foreground">{error || "The product you're looking for doesn't exist."}</p>
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "38349153002"; // +383 49 153 002 without + and spaces
    const message = encodeURIComponent(
      `Përshëndetje! Jam i interesuar për këtë produkt:\n\n` +
      `*${product.name}*\n` +
      `Çmimi: $${product.price}\n` +
      `Kategoria: ${product.category}\n` +
      `Sasia: ${quantity}\n\n` +
      `A mund të më jepni më shumë informacion?`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="pt-16 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 sm:mb-6 md:mb-8 h-10 sm:h-11"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm sm:text-base">Back to Products</span>
          </Button>

          <div className="max-w-4xl mx-auto">
            {/* Product Image */}
            {product.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 sm:mb-8"
              >
                <div className="relative w-full h-64 sm:h-96 md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-4 sm:space-y-6"
            >
              <div>
                <p className="text-xs sm:text-sm text-primary font-medium uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 sm:mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">${product.price}</p>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Scent Notes - Only show if notes exist */}
              {product.notes && product.notes.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Scent Notes</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {product.notes.map((note) => (
                      <motion.span
                        key={note}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 sm:px-5 py-1.5 sm:py-2 bg-muted rounded-full text-xs sm:text-sm font-medium"
                      >
                        {note}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 sm:gap-4 py-2 sm:py-4 border-y">
                <span className="font-medium text-sm sm:text-base">Quantity:</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                  >
                    <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <span className="w-12 sm:w-14 text-center font-semibold text-base sm:text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 sm:space-y-4 pt-2">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 hover-glow h-12 sm:h-14 text-base sm:text-lg font-semibold"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <Button
                  className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white hover-glow h-12 sm:h-14 text-base sm:text-lg font-semibold"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contact via WhatsApp
                </Button>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                Free shipping on orders over $150
              </p>
            </motion.div>
          </div>
        </div>
      </main>
  );
};

export default ProductDetail;

