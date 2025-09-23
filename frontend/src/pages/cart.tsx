import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { removeFromCart, clearCart, updateQuantity } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { SlHandbag } from "react-icons/sl";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleCheckout = () => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // ✅ Navigate to CheckoutSuccess before clearing cart to avoid empty state flash
    navigate("/checkout-success", { state: { total } });
    dispatch(clearCart());
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) return <p className="text-center mt-10">Cart is empty</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p>${item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item._id))}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Checkout button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCheckout}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Checkout
        </button>
      </div>

      {/* Continue Shopping */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-7 py-2 bg-blue-600 text-white hover:bg-blue-700 transition border-2 rounded-lg"
        >
          <SlHandbag className="text-lg" /> Continue Shopping
        </button>
      </div>

      {/* Clear Cart button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => dispatch(clearCart())}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          <FaTrash /> Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
