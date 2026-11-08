
import React from "react";

export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-image" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
          <div className="skeleton-button" />
        </div>
      ))}
    </div>
  );
}
