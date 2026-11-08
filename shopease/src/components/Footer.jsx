
import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h2>ShopEase</h2>
          <p>Your everyday shopping destination.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
        </div>

        <div>
          <h3>Customer Service</h3>
          <p>Contact Us</p>
          <p>Shipping Information</p>
          <p>Returns & Refunds</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
