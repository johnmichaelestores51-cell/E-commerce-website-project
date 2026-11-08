
import React from "react";
import ProductCard from "./ProductCard";

export default function FeaturedProducts({
  products = [],
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
  wishlist = [],
}) {
  const featured = products.filter(
    (product) => product.isFeatured
  );

  return (
    <section className="featured-section">
      <div className="section-heading">
        <h2>Featured Products</h2>
        <p>Our popular picks for you.</p>
      </div>

      <div className="product-grid">
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onViewDetails={onViewDetails}
            isWishlisted={wishlist.some((item) => item.id === product.id)}
          />
        ))}
      </div>
    </section>
  );
}
