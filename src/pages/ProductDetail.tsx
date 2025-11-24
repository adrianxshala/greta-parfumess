import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Product, ProductSize } from "@/types/product";
import { fetchProductById } from "@/services/products";

interface OutletContext {
  cartItems: any[];
  onAddToCart: (product: Product | undefined, quantity?: number) => void;
  onCartOpen: () => void;
  cartItemCount: number;
  onSearchOpen: () => void;
}

const ProductDetail = () => {
  const { cartItems, onAddToCart, onCartOpen, cartItemCount, onSearchOpen } =
    useOutletContext<OutletContext>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize>("35ml");
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        // Decode the ID in case it was encoded
        const decodedId = decodeURIComponent(id);
        const data = await fetchProductById(decodedId);
        if (data) {
          setProduct(data);
          // Set default size and price
          const defaultSize: ProductSize = "35ml";
          setSelectedSize(defaultSize);
          setCurrentPrice(data.price_35ml || data.price || 0);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product. Please try again later.");
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
        <p className="text-muted-foreground">
          {error || "The product you're looking for doesn't exist."}
        </p>
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  const handleSizeChange = (size: ProductSize) => {
    if (!product) return;

    setSelectedSize(size);

    // Update price based on selected size
    let newPrice = 0;
    switch (size) {
      case "15ml":
        newPrice = product.price_15ml || product.price || 0;
        break;
      case "35ml":
        newPrice = product.price_35ml || product.price || 0;
        break;
      case "100ml":
        newPrice = product.price_100ml || product.price || 0;
        break;
    }
    setCurrentPrice(newPrice);
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Create a cart item with the selected size and updated price
    const cartItem = {
      ...product,
      price: currentPrice,
      selectedSize: selectedSize,
    };

    onAddToCart(cartItem as Product, quantity);

    // Show toast with size info
    toast.success(
      `Added ${quantity} × ${product.name} (${selectedSize}) to cart`
    );
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleBackClick = () => {
    navigate("/products");
    // Restore scroll position and category after navigation
    setTimeout(() => {
      const savedPosition = sessionStorage.getItem('productsScrollPosition');
      if (savedPosition) {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: 'instant'
        });
        sessionStorage.removeItem('productsScrollPosition');
      }
      // Category will be restored automatically by Products component
    }, 150);
  };

  const handleWhatsAppClick = () => {
    if (!product) return;

    const phoneNumber = "38349153002"; // +383 49 153 002 without + and spaces

    // Clean and professional message without emojis
    const message = encodeURIComponent(
      `Përshëndetje!\n\n` +
        `Jam i interesuar për:\n` +
        `*${product.name}*\n\n` +
        `Madhësia: ${selectedSize}\n` +
        `Çmimi: €${currentPrice.toFixed(2)}\n` +
        `Sasia: ${quantity}\n\n` +
        `A mund të më jepni më shumë informacion?`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    // Use window.location.href to open directly in WhatsApp without popup dialog
    // This works better on mobile (opens app) and desktop (opens WhatsApp Web)
    window.location.href = whatsappUrl;
  };

  return (
    <main className="pt-16 sm:pt-20">
      {/* Fixed Back Button - Beautiful mobile design */}
      <div className="fixed top-20 sm:top-24 left-3 sm:left-6 z-40">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="h-11 sm:h-12 px-3 sm:px-4 rounded-full backdrop-blur-md bg-background/90 border border-primary/30 shadow-xl hover:bg-background hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5 sm:h-5 sm:w-5 sm:mr-2" />
            <span className="hidden sm:inline text-sm sm:text-base font-medium">Back to Products</span>
          </Button>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">

        <div className="max-w-4xl mx-auto">
          {/* Product Image */}
          {product.image && product.image.trim() && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 sm:mb-8"
            >
              <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[3/2] rounded-2xl sm:rounded-3xl overflow-hidden bg-transparent flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Hide image if it fails to load
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
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

              {/* Size Selection Buttons */}
              <div className="mb-4 sm:mb-6">
                <p className="text-sm sm:text-base font-medium mb-2 sm:mb-3">
                  Select Size:
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {(["15ml", "35ml", "100ml"] as ProductSize[]).map((size) => {
                    const sizePrice =
                      size === "15ml"
                        ? product.price_15ml
                        : size === "35ml"
                        ? product.price_35ml
                        : product.price_100ml;

                    const isAvailable = sizePrice !== undefined;

                    return (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => handleSizeChange(size)}
                        disabled={!isAvailable}
                        className={`h-10 sm:h-12 px-4 sm:px-6 font-semibold transition-all ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground hover-glow"
                            : "hover:bg-primary/10"
                        } ${
                          !isAvailable ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {size}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <p className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
                €{currentPrice.toFixed(2)}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Scent Notes - Only show if notes exist */}
            {product.notes && product.notes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  Scent Notes
                </h3>
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
              <span className="font-medium text-sm sm:text-base">
                Quantity:
              </span>
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
                <span className="w-12 sm:w-14 text-center font-semibold text-base sm:text-lg">
                  {quantity}
                </span>
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
              Free shipping on orders over €150
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
