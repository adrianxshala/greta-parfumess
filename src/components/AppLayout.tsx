import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import ShoppingCart from "@/components/ShoppingCart";
import Checkout from "@/components/Checkout";
import QuickViewModal from "@/components/QuickViewModal";
import SearchModal from "@/components/SearchModal";
import { Product, CartItem } from "@/types/product";
import { toast } from "sonner";

const AppLayout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const handleAddToCart = (product: Product | undefined, quantity: number = 1) => {
    if (!product) return;
    
    const existingItem = cartItems.find((item) => item.id === product.id);
    
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
      toast.success(`Added ${quantity} item(s) to cart`);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
      toast.success(`Added ${quantity} item(s) to cart`);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  // Only show Header on certain pages if needed, or show it everywhere
  const showHeader = true;

  return (
    <div className="min-h-screen">
      {showHeader && (
        <Header
          onCartOpen={() => setIsCartOpen(true)}
          cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onSearchOpen={() => setIsSearchOpen(true)}
        />
      )}

      <Outlet
        context={{
          cartItems,
          onAddToCart: handleAddToCart,
          onUpdateQuantity: handleUpdateQuantity,
          onRemoveFromCart: handleRemoveFromCart,
          onCartOpen: () => setIsCartOpen(true),
          cartItemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
          onSearchOpen: () => setIsSearchOpen(true),
          onQuickView: setSelectedProduct,
        }}
      />

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={() => {
          setCartItems([]);
        }}
      />

      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default AppLayout;

