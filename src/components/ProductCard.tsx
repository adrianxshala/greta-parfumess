import { motion } from "framer-motion";
import { ShoppingCart, Eye, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard = ({
  product,
  onAddToCart,
  onQuickView,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    // 🛠️ Debugging Step 1: Console.log produktin
    console.log("🛠️ [ProductCard] handleCardClick triggered");
    console.log("📦 Full Product Object:", product);
    console.log("🆔 Product ID:", product?.id);
    console.log("📝 Product Name:", product?.name);
    console.log("🔍 Product Type:", typeof product);
    console.log("🔍 ID Type:", typeof product?.id);

    // ✅ Type Safety Check
    if (!product) {
      console.error("❌ Product is undefined or null");
      return;
    }

    if (!product.id) {
      console.error("❌ Product ID is missing");
      console.error("📦 Product data:", JSON.stringify(product, null, 2));
      return;
    }

    // Ensure ID is a valid string and encode it properly
    const productId = String(product.id).trim();
    if (!productId) {
      console.error("❌ Product ID is empty after string conversion");
      return;
    }

    // 🛠️ Debugging Step 2: Verify Route Path
    const routePath = `/product/${productId}`;
    console.log("🛛 Route Path (before encoding):", routePath);

    // Check if ID contains special characters that need encoding
    const needsEncoding = /[^a-zA-Z0-9-_]/.test(productId);
    console.log("🔐 Needs Encoding:", needsEncoding);

    try {
      // Encode the ID to handle any special characters
      const encodedId = encodeURIComponent(productId);
      const finalPath = `/product/${encodedId}`;

      console.log("🛛 Final Route Path:", finalPath);
      console.log("🔐 Encoded ID:", encodedId);
      console.log("✅ Navigating to:", finalPath);

      // 🛠️ Debugging Step 3: Check for External URLs (should not be)
      if (productId.startsWith("http://") || productId.startsWith("https://")) {
        console.warn("⚠️ Warning: Product ID appears to be an external URL!");
        console.warn("⚠️ This might cause routing issues. ID:", productId);
      }

      // Navigate using React Router v6 syntax
      navigate(finalPath, { replace: false });

      console.log("✅ Navigation successful");
    } catch (error) {
      console.error("❌ Error navigating to product:", error);
      console.error("📦 Product data at error:", product);
      console.error("🆔 Product ID at error:", productId);

      // Fallback: try without encoding
      try {
        console.log("🔄 Attempting fallback navigation without encoding...");
        navigate(`/product/${productId}`, { replace: false });
      } catch (fallbackError) {
        console.error("❌ Fallback navigation also failed:", fallbackError);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
      whileHover={{ y: -8 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      }}
    >
      <motion.div
        className="glass-card rounded-3xl sm:rounded-[2rem] overflow-hidden hover-glow transition-all duration-500 cursor-pointer bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/10 hover:border-primary/30 shadow-lg hover:shadow-2xl hover:shadow-primary/20 relative"
        onClick={handleCardClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Decorative sparkle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isHovered
              ? { opacity: 1, scale: 1, rotate: 180 }
              : { opacity: 0, scale: 0 }
          }
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 z-10"
        >
          <Sparkles className="h-5 w-5 text-primary/60" />
        </motion.div>

        {/* Like button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        </motion.button>

        {/* Product Image */}
        {product.image && product.image.trim() && (
          <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 p-4 sm:p-6">
            <motion.img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-500"
              animate={
                isHovered ? { scale: 1.1, rotate: 2 } : { scale: 1, rotate: 0 }
              }
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl -z-10"
              animate={isHovered ? { opacity: 0.6 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Product Info */}
        <div className="p-5 sm:p-6 space-y-3 sm:space-y-4 bg-gradient-to-b from-card to-card/95">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <motion.h3
                className="font-serif text-lg sm:text-xl font-bold truncate bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {product.name}
              </motion.h3>
              <motion.p
                className="text-xs sm:text-sm text-muted-foreground capitalize mt-1 inline-block px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20"
                whileHover={{ scale: 1.05 }}
              >
                {product.category}
              </motion.p>
            </div>
            <motion.p
              className="font-bold text-lg sm:text-xl whitespace-nowrap ml-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              whileHover={{ scale: 1.1 }}
            >
              €{product.price}
            </motion.p>
          </div>

          {product.description && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-11 sm:h-12 text-sm sm:text-base rounded-xl border-2 hover:bg-primary/10 hover:border-primary/30 transition-all backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
              >
                <Eye className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Shiko Shpejt</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="flex-1 h-11 sm:h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-sm sm:text-base rounded-xl shadow-lg shadow-primary/30 transition-all font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
              >
                <ShoppingCart className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Shto në Shportë</span>
                <span className="sm:hidden">Shto</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
