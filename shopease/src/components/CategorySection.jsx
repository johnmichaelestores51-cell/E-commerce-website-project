
import React from "react";

export default function CategorySection({
  categories = [],
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <section className="category-section" id="categories">
      <h2>Shop by Category</h2>

      <div className="category-list">
        <button
          className={!selectedCategory ? "active" : ""}
          onClick={() => onSelectCategory?.("")}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category ? "active" : ""
            }
            onClick={() => onSelectCategory?.(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
