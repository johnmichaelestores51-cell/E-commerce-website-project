
export const SHIPPING_FEE = 9.99;

export const FREE_SHIPPING_THRESHOLD = 150;

// Calculate the subtotal of all cart products.
export function calculateSubtotal(cart) {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

// Calculate shipping charges.
export function calculateShipping(subtotal, itemCount) {
  if (
    subtotal > FREE_SHIPPING_THRESHOLD ||
    itemCount === 0
  ) {
    return 0;
  }

  return SHIPPING_FEE;
}

// Calculate the complete order total.
export function calculateCartTotal(subtotal, shipping) {
  return subtotal + shipping;
}

// Count total product units in the cart.
export function calculateCartItemCount(cart) {
  return cart.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
}

// Format prices consistently.
export function formatCurrency(amount) {
  return `$${Number(amount).toFixed(2)}`;
}
