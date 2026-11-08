
import React from "react";

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
}) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <img src={product.image} alt={product.name} />

        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>

          <p>Category: {product.category}</p>
          <p>Rating: ⭐ {product.rating || 4.5}</p>

          <h3>
            ₱{Number(product.price).toLocaleString("en-PH")}
          </h3>

          <button onClick={() => onAddToCart?.(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
