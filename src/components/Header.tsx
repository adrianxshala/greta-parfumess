import { ShoppingBag, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onCartOpen: () => void;
  cartItemCount: number;
  onSearchOpen: () => void;
}

const Header = ({ onCartOpen, cartItemCount, onSearchOpen }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b"
    >
      <nav className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.h1
            className="text-lg sm:text-xl md:text-2xl font-serif font-bold gradient-text cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={handleLogoClick}
          >
            Greta parfumes
          </motion.h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearchOpen}
            className="h-10 w-10 sm:h-11 sm:w-11 hover-glow"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 sm:h-11 sm:w-11 hover-glow"
            onClick={onCartOpen}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold"
              >
                {cartItemCount}
              </motion.span>
            )}
          </Button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
