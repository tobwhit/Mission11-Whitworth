import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem } from '../types/CartItem';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { addToast } = useToast();

  const addToCart = (item: CartItem) => {
    // Show success toast notification BEFORE state update
    addToast(`${item.title} added to cart!`, 'success');

    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);
      const updatedCart = prevCart.map((c) =>
        c.bookID === item.bookID
          ? {
              ...c,
              quantity: c.quantity + item.quantity,
              subtotal: c.subtotal + item.price,
            }
          : c
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeFromCart = (bookId: number) => {
    // Find the item to show toast BEFORE state update
    const removedItem = cart.find((c) => c.bookID === bookId);
    if (removedItem) {
      addToast(`${removedItem.title} removed from cart`, 'info');
    }

    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookId));
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
