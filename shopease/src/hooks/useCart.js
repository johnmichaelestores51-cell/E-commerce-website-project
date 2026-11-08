
import { useMemo } from 'react';
import useLocalStorage from './useLocalStorage';
import {
  calculateSubtotal,
  calculateShipping,
  calculateCartTotal,
  calculateCartItemCount
} from '../utils/calculations';

export default function useCart() {
  const [cart, setCart] = useLocalStorage(
    'shopease_cart',
    []
  );

  // Add a product or increase its existing quantity.
  const addToCart = (product, quantity = 1) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity
        }
      ];
    });
  };

  // Increase or decrease the quantity of an item.
  const updateQuantity = (productId, amount) => {
    setCart((previousCart) =>
      previousCart.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(
            1,
            item.quantity + amount
          )
        };
      })
    );
  };

  // Remove an entire product from the cart.
  const removeFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Empty the cart after successful checkout.
  const clearCart = () => {
    setCart([]);
  };

  // Calculate values only when the cart changes.
  const subtotal = useMemo(
    () => calculateSubtotal(cart),
    [cart]
  );

  const shipping = useMemo(
    () => calculateShipping(subtotal, cart.length),
    [subtotal, cart.length]
  );

  const total = useMemo(
    () => calculateCartTotal(subtotal, shipping),
    [subtotal, shipping]
  );

  const itemCount = useMemo(
    () => calculateCartItemCount(cart),
    [cart]
  );

  return {
    cart,
    setCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shipping,
    total,
    itemCount
  };
}
