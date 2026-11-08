
import React, { useMemo, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import CategorySection from "./components/CategorySection";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Toast from "./components/Toast";

import { products } from "./data/products";
import useCart from "./hooks/useCart";
import useWishlist from "./hooks/useWishlist";

import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart();

  const { wishlist, toggleWishlist } = useWishlist();

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Beauty",
    "Accessories",
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const notify = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    notify(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (product) => {
    if (product?.id == null) return;

    const alreadyAdded = wishlist.some(
      (item) => item.id === product.id
    );
    toggleWishlist(product);

    notify(
      alreadyAdded
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      notify("Your cart is empty!", "error");
      return;
    }

    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = (customer) => {
    const order = {
      id: `ORD-${Date.now()}`,
      customer,
      items: cart,
      total: cartTotal,
      date: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("shopease-orders") || "[]"
    );

    localStorage.setItem(
      "shopease-orders",
      JSON.stringify([...existingOrders, order])
    );

    clearCart();
    setCheckoutOpen(false);

    notify("Your order has been placed successfully!");

    console.log("New Order:", order);
  };

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      <Header
        cartCount={cart.reduce(
          (sum, item) => sum + item.quantity,
          0
        )}
        wishlistCount={wishlist.length}
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={() => {
          setSelectedCategory("");
          setSearch("");
          scrollToProducts();
        }}
        onSearch={setSearch}
      />

      <main>
        <HeroBanner onShopNow={scrollToProducts} />

        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <FeaturedProducts
          products={products}
          wishlist={wishlist}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onViewDetails={setSelectedProduct}
        />

        <section className="products-section" id="products">
          <div className="section-heading">
            <h2>All Products</h2>
            <p>Explore our complete collection.</p>
          </div>

          <div className="product-toolbar">
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onViewDetails={setSelectedProduct}
                  isWishlisted={wishlist.some(
                    (item) => item.id === product.id
                  )}
                />
              ))
            ) : (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try another search or category.</p>

                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        cartItems={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        total={cartTotal}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handlePlaceOrder}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({ message: "", type: "success" })
        }
      />
    </div>
  );
}