import { ShoppingBag, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  onCartOpen: () => void;
  cartItemCount: number;
  onSearchOpen: () => void;
}

const Header = ({ onCartOpen, cartItemCount, onSearchOpen }: HeaderProps) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleLogoClick = () => {
    navigate("/");
    // Scroll to top when navigating home
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.5,
      }}
      className={`fixed top-3 left-3 right-3 z-50 border border-primary/20 navbar-blur ${
        isScrolled
          ? "rounded-b-2xl sm:rounded-b-3xl"
          : "rounded-2xl sm:rounded-3xl"
      }`}
    >
      <motion.nav
        className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 sm:gap-4 ml-4 sm:ml-6 md:ml-8">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold gradient-text cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={handleLogoClick}
          >
            GB
          </motion.h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearchOpen}
              className="h-10 w-10 sm:h-11 sm:w-11 hover-glow"
            >
              <Search className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 sm:h-11 sm:w-11 hover-glow"
              onClick={onCartOpen}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.nav>
    </motion.header>
  );
};

export default Header;
