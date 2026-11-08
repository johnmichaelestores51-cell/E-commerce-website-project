
import React from "react";

export default function HeroBanner({ onShopNow }) {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <span>WELCOME TO SHOPEASE</span>

        <h1>
          Discover Amazing Products
          <br />
          At Amazing Prices
        </h1>

        <p>
          Find your favorite products and enjoy a convenient
          shopping experience.
        </p>

        <button onClick={onShopNow}>
          Shop Now
        </button>
      </div>
    </section>
  );
}
