import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import type { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const { token } = useSelector((state: RootState) => state.auth);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id));
      toast.success("Item removed from cart");
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!token) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
    }

    // Navigate to checkout confirmation page where order will be created
    navigate("/checkout-confirmation");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-gray-400 text-6xl mb-6">
            <FaShoppingBag />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <button
            onClick={() => navigate("/home")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Shopping Cart</h1>
            <p className="text-blue-100">{totalItems} item{totalItems !== 1 ? 's' : ''} in cart</p>
          </div>

          {/* Cart Items */}
          <div className="p-6">
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-green-600 font-bold text-lg">${item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <FaMinus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-12 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <FaPlus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleClearCart}
                className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>

            <button
              onClick={() => navigate("/home")}
              className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;