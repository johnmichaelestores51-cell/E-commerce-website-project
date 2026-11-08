
import React, { useState } from "react";

export default function CheckoutModal({
  isOpen,
  total,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    onSubmit?.(form);
  };

  return (
    <div className="modal-overlay">
      <div className="checkout-modal">
        <button onClick={onClose} className="modal-close">
          ×
        </button>

        <h2>Checkout</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Complete Delivery Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option>Cash on Delivery</option>
            <option>GCash</option>
            <option>Bank Transfer</option>
          </select>

          <h3>
            Total: ₱{Number(total).toLocaleString("en-PH")}
          </h3>

          <button type="submit">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
