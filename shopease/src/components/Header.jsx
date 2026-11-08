
import React from "react";

export default function Header({
  cartCount = 0,
  wishlistCount = 0,
  onCartClick,
  onWishlistClick,
  onSearch,
}) {
  return (
    <header className="site-header">
      <div className="header-container">
        <a href="/" className="logo">
          Shop<span>Ease</span>
        </a>

        <form
          className="search-bar"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch?.(e.target.search.value);
          }}
        >
          <input
            type="search"
            name="search"
            placeholder="Search products..."
          />
          <button type="submit">Search</button>
        </form>

        <nav className="header-actions">
          <button onClick={onWishlistClick}>
            ♡ <span>Wishlist ({wishlistCount})</span>
          </button>

          <button onClick={onCartClick}>
            🛒 <span>Cart ({cartCount})</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
