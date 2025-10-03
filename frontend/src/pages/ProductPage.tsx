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

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (newImage) formData.append("image", newImage);

      // ✅ added token here
      await dispatch(updateProduct({ id: editProduct._id!, formData, token })).unwrap();

      toast.success("Product updated successfully!");

      // ✅ refresh list so Home page also sees changes
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
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Products</h1>

        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {["ID", "Name", "Price", "Description", "Actions"].map((header) => (
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
                {products.map((p, i) => (
                  <tr
                    key={p._id}
                    className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 break-words max-w-xs">{p._id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{p.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">${p.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-sm">
                      {p.description}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id!)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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

      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <input
              type="text"
              name="name"
              value={editProduct.name}
              onChange={handleEditChange}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <input
              type="number"
              name="price"
              value={editProduct.price}
              onChange={handleEditChange}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <textarea
              name="description"
              value={editProduct.description}
              onChange={handleEditChange}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                name="inStock"
                checked={editProduct.inStock}
                onChange={handleEditChange}
              />
              In Stock
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
            {newImage ? (
              <img src={URL.createObjectURL(newImage)} alt="Preview" className="w-32 h-32 mb-2" />
            ) : (
              <img src={editProduct.image} alt="Preview" className="w-32 h-32 mb-2" />
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditProduct(null)}
                className="bg-gray-500 px-3 py-1 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="bg-blue-600 px-3 py-1 text-white rounded"
              >
                {editLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
