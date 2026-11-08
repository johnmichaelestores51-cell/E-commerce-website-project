import React from "react";
import ProductCard from "../components/ProductCard";

export default function Wishlist({
  products = [],
  onContinueShopping,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
}) {
  return (
    <section className="products-section wishlist-page">
      <div className="section-heading">
        <h2>My Wishlist</h2>
        <p>Your saved products are here.</p>
      </div>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onViewDetails={onViewDetails}
              isWishlisted
            />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <h3>Your wishlist is empty</h3>
          <p>Tap the heart on a product to save it here.</p>
          <button
            className="wishlist-continue-button"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      )}

      {products.length > 0 && (
        <button
          className="wishlist-continue-button"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
      )}
    </section>
  );
}