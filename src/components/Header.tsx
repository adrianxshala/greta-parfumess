import { ShoppingBag, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeaderProps {
  onCartOpen: () => void;
  cartItemCount: number;
  onSearchOpen: () => void;
}

const Header = ({ onCartOpen, cartItemCount, onSearchOpen }: HeaderProps) => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b"
    >
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <motion.h1 
            className="text-2xl font-serif font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            LUXE PARFUM
          </motion.h1>
          <div className="hidden lg:flex items-center gap-6">
            <a href="#products" className="text-sm hover:text-primary transition-colors">Collection</a>
            <a href="#categories" className="text-sm hover:text-primary transition-colors">Categories</a>
            <a href="#featured" className="text-sm hover:text-primary transition-colors">Featured</a>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onSearchOpen}
            className="hover-glow"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover-glow"
            onClick={onCartOpen}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center"
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
