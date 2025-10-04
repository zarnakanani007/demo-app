


// // import React, { useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import type { RootState, AppDispatch } from "../redux/store";
// // import { fetchProducts } from "../redux/productSlice";
// // import { addToCart } from "../redux/cartSlice";
// // import { toast } from "react-hot-toast";
// // import { useNavigate } from "react-router-dom"; // ✅ Add this

// // const UserDashboard: React.FC = () => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const navigate = useNavigate(); // ✅ Add navigation
// //   const { products, loading, error } = useSelector((state: RootState) => state.products);
// //   const { user } = useSelector((state: RootState) => state.auth);
  
// //   const isAdmin = user?.role === "admin"; // ✅ Add admin check

// //   // ✅ Redirect admin users to admin dashboard
// //   useEffect(() => {
// //     if (isAdmin) {
// //       navigate("/dashboard");
// //     }
// //   }, [isAdmin, navigate]);

// //   // Fetch products on mount
// //   useEffect(() => {
// //     if (!isAdmin) { // ✅ Only fetch if not admin
// //       dispatch(fetchProducts());
// //     }
// //   }, [dispatch, isAdmin]);

// //   const handleAddToCart = (product: any) => {
// //     if (!product.inStock) {
// //       toast.error("Product out of stock!");
// //       return;
// //     }
// //     dispatch(addToCart(product));
// //     toast.success(`${product.name} added to cart!`);
// //   };

// //   // ✅ Don't show anything for admin users (they get redirected)
// //   if (isAdmin) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <p className="text-gray-600">Redirecting to admin dashboard...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
// //         Welcome, {user?.name}!
// //       </h1>

// //       {loading && <p className="text-center text-blue-600">Loading...</p>}
// //       {error && <p className="text-center text-red-600">{error}</p>}

// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {products.map((product) => (
// //           <div key={product._id} className="bg-white p-4 rounded shadow flex flex-col">
// //             <img
// //               src={product.image}
// //               alt={product.name}
// //               className="w-full h-40 object-cover rounded mb-2"
// //             />
// //             <h2 className="text-xl font-semibold">{product.name}</h2>
// //             <p className="text-gray-600 truncate">{product.description}</p>
// //             <p className="font-bold mt-2">${product.price}</p>
// //             <p
// //               className={`mt-1 font-semibold ${
// //                 product.inStock ? "text-green-600" : "text-red-600"
// //               }`}
// //             >
// //               {product.inStock ? "In Stock" : "Out of Stock"}
// //             </p>

// //             {/* ✅ This will only show for regular users (admin gets redirected) */}
// //             <button
// //               onClick={() => handleAddToCart(product)}
// //               disabled={!product.inStock}
// //               className={`mt-auto py-2 px-4 rounded font-semibold text-white ${
// //                 product.inStock ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
// //               }`}
// //             >
// //               {product.inStock ? "Add to Cart" : "Out of Stock"}
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserDashboard;



import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import type { RootState, AppDispatch } from "../redux/store";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaShoppingCart, FaStar } from "react-icons/fa";

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterInStock, setFilterInStock] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    if (!product.inStock) {
      toast.error("Product out of stock!");
      return;
    }
    
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    }));
    
    toast.success(`${product.name} added to cart!`);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => !filterInStock || product.inStock)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(fetchProducts())}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to ShopEasy, {user?.name}!
          </h1>
          <p className="text-lg text-gray-600">Discover amazing products at great prices</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{products.length}</div>
            <div className="text-gray-600">Total Products</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {products.filter(p => p.inStock).length}
            </div>
            <div className="text-gray-600">In Stock</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{cartItems.length}</div>
            <div className="text-gray-600">Items in Cart</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Filter */}
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={filterInStock}
                onChange={(e) => setFilterInStock(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/products/${product._id}`} className="block">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center">
                      <span className="bg-white px-3 py-1 rounded-full text-red-600 font-bold text-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    {/* <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar className="w-4 h-4" />
                      <span className="text-sm text-gray-600">4.5</span>
                    </div> */}
                  </div>

                  <div className={`text-sm font-medium ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}>
                    {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                  </div>
                </div>
              </Link>

              {/* Add to Cart Button */}
              <div className="p-4 border-t">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-colors ${
                    product.inStock
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FaShoppingCart className="w-4 h-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;


