
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { createProduct } from "../redux/productSlice";
import toast from "react-hot-toast";

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("Clothing"); // ADD category state
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Define categories
  const categories = ['Shoes', 'Clothing', 'Electronics', 'Accessories', 'Books', 'Sports', 'Home', 'Beauty'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !image) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("category", category); // ADD category to form data
    formData.append("inStock", inStock.toString());
    formData.append("image", image);

    try {
      setLoading(true);
      await dispatch(createProduct(formData)).unwrap();
      toast.success("Product created successfully!");

      // Reset form
      setName("");
      setDescription("");
      setPrice(0);
      setCategory("Clothing");
      setInStock(true);
      setImage(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        <div className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price *
            </label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Stock Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="inStock"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
              In Stock
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-6 rounded-lg font-semibold text-white transition-colors ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg"
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Product...
            </span>
          ) : (
            "Add Product"
          )}
        </button>
      </form>

      {/* Live list of added products */}
      {products.length > 0 && (
        <div className="mt-8 w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">Recently Added Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(-6).reverse().map((p) => (
              <div
                key={p._id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 line-clamp-1">{p.name}</p>
                    <p className="text-green-600 font-bold">${p.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${p.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                        {p.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;