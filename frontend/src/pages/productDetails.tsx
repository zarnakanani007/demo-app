import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'
import { fetchProducts } from '../redux/productSlice'
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from '../redux/cartSlice'

function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>()

    const { products, loading, error } = useSelector(
        (state: RootState) => state.products
    )

    // Fetch if empty
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts())
        }
    }, [dispatch, products])

    const product = products.find((p) => p._id === id);

    if (loading) return <p className='text-center mt-10'>Loading...</p>
    if (error) return <p className='text-center mt-10 text-red-500'>{error}</p>
    if (!product) return <p className='text-center mt-10'>Product not found</p>

    // Dummy Add to Cart function
    const handleAddToCart = () => {
        if(!product) return;

        dispatch(addToCart({
            _id:product._id!,
            name:product.name,
            price:product.price,
            quantity:1,
            image:product.image
        }))
        alert(`${product?.name} added to cart!`)
        console.log("Added to Cart:", product);
    }

    return (
        <div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10'>
            <img
                src={product.image}
                alt={product.name}
                className='w-full h-64 object-cover rounded-lg mb-6'
            />
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>{product.name}</h2>
            <p className='text-gray-600 mb-4'>{product.description}</p>
            <p className='text-xl font-semibold text-purple-600 mb-2'>Price: ${product.price}</p>
            <p className={`font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
                <Link
                    to="/"
                    className='inline-block px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition'
                >
                    ← Back to Home
                </Link>

                <button
                    onClick={handleAddToCart}
                    className='flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition'
                >
                    <FaShoppingCart /> Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductDetails;
