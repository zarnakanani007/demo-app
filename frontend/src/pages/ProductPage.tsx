import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchProducts, updateProduct, deleteProduct } from "../redux/productSlice";
import type { Product } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const { products, loading } = useSelector((state: RootState) => state.products);

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Define categories
  const categories = ['all', 'Shoes', 'Clothing', 'Electronics', 'Accessories', 'Books', 'Sports', 'Home', 'Beauty'];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products by category
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await dispatch(deleteProduct({ id, token })).unwrap();
      toast.success("Product deleted successfully!");
    } catch (err: any) {
      toast.error(err || "Failed to delete product.");
    }
  };

  const openEditModal = (product: Product) => {
    setEditProduct(product);
    setNewImage(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editProduct) return;
    const { name, value, type, checked } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setNewImage(e.target.files[0]);
  };

  const handleEditSave = async () => {
    if (!editProduct) return;
    setEditLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", editProduct.name);
      formData.append("price", editProduct.price.toString());
      formData.append("description", editProduct.description || "");
      formData.append("inStock", editProduct.inStock.toString());
      formData.append("category", editProduct.category); // ADD category
      if (newImage) formData.append("image", newImage);

      await dispatch(updateProduct({ id: editProduct._id!, formData, token })).unwrap();
      toast.success("Product updated successfully!");
      dispatch(fetchProducts());
      setEditProduct(null);
      setNewImage(null);
    } catch (err: any) {
      toast.error(err || "Failed to update product.");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
      >
        &larr; Back to Dashboard
      </button>

      <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
          <button
            onClick={() => navigate("/dashboard/create-product")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + Create Product
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          {selectedCategory !== "all" && (
            <span className="ml-4 text-sm text-gray-600">
              Showing {filteredProducts.length} products in {selectedCategory}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              {selectedCategory === "all"
                ? "No products found."
                : `No products found in ${selectedCategory} category.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {["Image", "Name", "Category", "Price", "Stock", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredProducts.map((p, i) => (
                  <tr
                    key={p._id}
                    className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4">
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{p.name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">${p.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${p.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id!)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={editProduct.name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={editProduct.category}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editProduct.description}
                  onChange={handleEditChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={editProduct.inStock}
                  onChange={handleEditChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">In Stock</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                <div className="mt-2">
                  {newImage ? (
                    <img src={URL.createObjectURL(newImage)} alt="Preview" className="w-32 h-32 object-cover rounded" />
                  ) : (
                    <img src={editProduct.image} alt="Preview" className="w-32 h-32 object-cover rounded" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditProduct(null)}
                className="bg-gray-500 px-4 py-2 text-white rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={editLoading}
                className="bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;