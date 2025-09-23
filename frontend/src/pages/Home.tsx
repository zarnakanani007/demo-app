import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import type { RootState, AppDispatch } from "../redux/store"; // ✅ type-only import
import CreateProduct from "./createProducts";
import { Link } from "react-router-dom";


const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Get products, loading, error from Redux
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
  
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      {loading && <p className="text-center text-blue-600">Loading products...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition block"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">${product.price}</p>
            <p className={`mt-1 ${product.inStock ? "text-green-600" : "text-red-600"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </Link>
        ))}
      </div>
    </div>
    {/* <div>
      <CreateProduct/>
    </div> */}
    </>
  );
};

export default Home;
