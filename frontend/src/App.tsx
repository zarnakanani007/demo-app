import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import CheckoutConfirmation from "./pages/checkoutConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateProduct from "./pages/createProducts";
import ProductDetails from "./pages/productDetails";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Cart from "./pages/cart"


function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get user from Redux
  const user = useSelector((state: RootState) => state.auth.user);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Navbar links
  const navLinks = [
    { name: "Register", path: "/register", color: "green" },
    { name: "Login", path: "/login", color: "blue" },
    { name: "Home", path: "/", color: "purple" },
    { name: "Add Product", path: "/create-product", color: "pink" }, // 👈 always visible (you can protect later)
    { name: "Cart", path: "/cart", color: "pink" },
    { name: "CheckoutSuccess", path: "/checkout-success", color: "pink" }
  ];

  const getLinkClasses = (isActive: boolean, color: string) => {
    const activeClass = `text-black px-4 py-2 rounded-md font-semibold`;
    const inactiveClass = `px-4 py-2 rounded-md font-semibold`;

    return isActive
      ? `bg-${color}-600 ${activeClass}`
      : `text-${color}-600 hover:bg-${color}-100 ${inactiveClass}`;
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800">MyDemoApp</div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => getLinkClasses(isActive, link.color)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col gap-2 px-4 py-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => getLinkClasses(isActive, link.color)}
            >
              {link.name}
            </NavLink>
          ))}

          {/* Cart link */}
          {user && (
            <NavLink
              to="/cart"
              className="px-4 py-2 font-semibold text-yellow-600 hover:bg-yellow-100 rounded"
            >
              Cart
            </NavLink>
          )}
        </div>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-confirmation" element={<CheckoutConfirmation />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
      </Routes>
    </>
  );
}

export default App;
