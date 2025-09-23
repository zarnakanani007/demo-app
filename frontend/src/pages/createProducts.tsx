import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { createProduct } from "../redux/productSlice";
import toast from "react-hot-toast";

function CreateProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState("");

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !image) {
      toast.error("Please fill in all required fields!");
      return;
    }

    dispatch(createProduct({ name, description, price, inStock, image }))
      .unwrap()
      .then(() => {
        toast.success("Product created successfully!");
        // Reset form
        setName("");
        setDescription("");
        setPrice(0);
        setInStock(true);
        setImage("");
      })
      .catch((err: any) => {
        toast.error(err.message || "Failed to create product");
      });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="mr-2"
          />
          In Stock
        </label>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition"
        >
          Add Product
        </button>
      </form>

      {/* Live list of added products */}
      {products.length > 0 && (
        <div className="mt-8 w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">Added Products</h3>
          <ul className="space-y-2">
            {products.map((p) => (
              <li
                key={p._id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-gray-600 text-sm">${p.price}</p>
                </div>
                <p className={`text-sm ${p.inStock ? "text-green-600" : "text-red-600"}`}>
                  {p.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreateProduct;
