
import React from "react";

export default function CartDrawer({
  isOpen,
  cartItems = [],
  onClose,
  onRemove,
  onUpdateQuantity,
  onCheckout,
}) {
  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <h2>Your Shopping Cart</h2>
          <button onClick={onClose}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart">
            Your cart is currently empty.
          </p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-details">
                    <h4>{item.name}</h4>

                    <p>
                      ₱{Number(item.price).toLocaleString("en-PH")}
                    </p>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          onUpdateQuantity?.(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          onUpdateQuantity?.(
                            item.id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-button"
                      onClick={() => onRemove?.(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <h3>
                Total: ₱{total.toLocaleString("en-PH")}
              </h3>

              <button onClick={onCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
