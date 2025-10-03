import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import type { RootState, AppDispatch } from "../redux/store";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    if (!product.inStock) {
      toast.error("Product out of stock!");
      return;
    }
    
    // ✅ CORRECTED: Use proper cart item structure
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    }));
    
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      {loading && <p className="text-center text-blue-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow flex flex-col">
            {/* Product details wrapped in Link */}
            <Link to={`/products/${product._id}`} className="flex flex-col flex-grow no-underline">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 truncate">{product.description}</p>
              <p className="font-bold mt-2 text-gray-900">${product.price}</p>
              <p className={`mt-1 font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </Link>

            {/* Add to Cart button */}
            {!isAdmin && (
              <button
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
                className={`mt-4 py-2 px-4 rounded font-semibold text-white ${
                  product.inStock ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            )}

            {/* Admin message */}
            {isAdmin && (
              <div className="mt-4 py-2 px-4 rounded font-semibold bg-gray-100 text-gray-600 text-center">
                Admin View - Cart Disabled
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;