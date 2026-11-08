
import React from "react";

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
  isWishlisted = false,
}) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        <button
          className={`wishlist-button ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() => onToggleWishlist?.(product)}
          aria-label="Toggle wishlist"
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        {product.discount && (
          <span className="discount-badge">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-rating">
          ⭐ {product.rating || 4.5}
        </div>

        <div className="product-price">
          <strong>
            ₱{Number(product.price).toLocaleString("en-PH")}
          </strong>
        </div>

        <div className="product-buttons">
          <button onClick={() => onAddToCart?.(product)}>
            Add to Cart
          </button>

          <button
            className="details-button"
            onClick={() => onViewDetails?.(product)}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
