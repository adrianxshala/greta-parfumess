import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onQuickView }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div 
        className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden hover-glow transition-all duration-300 cursor-pointer active:scale-[0.98]"
        onClick={handleCardClick}
      >
        {/* Product Image */}
        {product.image && product.image.trim() && (
          <div className="relative w-full aspect-square overflow-hidden bg-transparent">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Hide image if it fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* Product Info */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg sm:text-xl font-semibold truncate">{product.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground capitalize mt-0.5">{product.category}</p>
            </div>
            <p className="font-semibold text-base sm:text-lg whitespace-nowrap ml-2">€{product.price}</p>
          </div>
          
          {product.description && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-10 sm:h-11 text-sm sm:text-base"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
            >
              <Eye className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Quick View</span>
            </Button>
            <Button
              size="sm"
              className="flex-1 h-10 sm:h-11 bg-primary hover:bg-primary/90 text-sm sm:text-base"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              <ShoppingCart className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
