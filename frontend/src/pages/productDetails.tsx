// import React, { useEffect } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import type { RootState, AppDispatch } from '../redux/store'
// import { fetchProducts } from '../redux/productSlice'
// import { FaShoppingCart } from "react-icons/fa";
// import { addToCart } from '../redux/cartSlice'
// import { toast } from 'react-hot-toast';

// function ProductDetails() {
//     const { id } = useParams<{ id: string }>();
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();

//     const { products, loading, error } = useSelector((state: RootState) => state.products);
//     const { user } = useSelector((state: RootState) => state.auth);
//     const isAdmin = user?.role === "admin";

//     console.log('🔄 ProductDetails - ID:', id);
//     console.log('📦 Products count:', products.length);

//     useEffect(() => {
//         console.log('🚀 Fetching products...');
//         dispatch(fetchProducts());
//     }, [dispatch, id]);

//     // Find the product
//     const product = products.find((p) => p._id === id);
    
//     console.log('🔍 Product found:', product);

//     // If no product found after loading, show error
//     if (!loading && !product) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
//                     <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
//                     <button 
//                         onClick={() => navigate('/home')}
//                         className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                         Go Back to Home
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//                     <p className="mt-4 text-lg">Loading product details...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
//                     <p className="text-gray-600">{error}</p>
//                     <button 
//                         onClick={() => navigate('/home')}
//                         className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                         Go Back to Home
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     if (!product) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
//                     <button 
//                         onClick={() => navigate('/home')}
//                         className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                         Go Back to Home
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const handleAddToCart = () => {
//         if (!product.inStock) {
//             toast.error("This product is out of stock!");
//             return;
//         }

//         dispatch(addToCart({
//             _id: product._id!,
//             name: product.name,
//             price: product.price,
//             quantity: 1,
//             image: product.image
//         }));
//         toast.success(`${product.name} added to cart!`);
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-8">
//             <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     {/* Product Image */}
//                     <div>
//                         <img
//                             src={product.image}
//                             alt={product.name}
//                             className='w-full h-80 object-cover rounded-lg'
//                         />
//                     </div>
                    
//                     {/* Product Details */}
//                     <div>
//                         <h2 className='text-3xl font-bold text-gray-800 mb-4'>{product.name}</h2>
//                         <p className='text-gray-600 mb-6 leading-relaxed'>{product.description}</p>
//                         <p className='text-2xl font-semibold text-purple-600 mb-4'>${product.price}</p>
//                         <p className={`text-lg font-semibold mb-6 ${product.inStock ? "text-green-600" : "text-red-600"}`}>
//                             {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
//                         </p>

//                         {/* Action Buttons */}
//                         <div className="flex flex-col gap-4">
//                             <div className="flex gap-4">
//                                 <button
//                                     onClick={() => navigate('/home')}
//                                     className='flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition'
//                                 >
//                                     ← Back to Home
//                                 </button>

//                                 {!isAdmin && (
//                                     <button
//                                         onClick={handleAddToCart}
//                                         disabled={!product.inStock}
//                                         className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg shadow text-white ${
//                                             product.inStock
//                                                 ? "bg-purple-600 hover:bg-purple-700"
//                                                 : "bg-gray-400 cursor-not-allowed"
//                                         }`}
//                                     >
//                                         <FaShoppingCart /> 
//                                         {product.inStock ? "Add to Cart" : "Out of Stock"}
//                                     </button>
//                                 )}
//                             </div>

//                             {isAdmin && (
//                                 <div className="px-4 py-3 rounded-lg shadow bg-gray-100 text-gray-600 text-center">
//                                     👨‍💼 Admin View - Cart Disabled
//                                 </div>
//                             )}

//                             <Link
//                                 to={`/products/${product._id}/reviews`}
//                                 className='block text-center px-4 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition'
//                             >
//                                 📝 View Reviews
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductDetails;



import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'
import { fetchProducts } from '../redux/productSlice'
import { FaShoppingCart, FaStar, FaArrowLeft } from "react-icons/fa";
import { addToCart } from '../redux/cartSlice'
import { toast } from 'react-hot-toast';

function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { products, loading, error } = useSelector((state: RootState) => state.products);
    const { user } = useSelector((state: RootState) => state.auth);
    const isAdmin = user?.role === "admin";

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch, id]);

    const product = products.find((p) => p._id === id);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={() => navigate('/home')}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go Back to Home
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
                    <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
                    <button 
                        onClick={() => navigate('/home')}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!product.inStock) {
            toast.error("This product is out of stock!");
            return;
        }

        dispatch(addToCart({
            _id: product._id!,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        }));
        toast.success(`${product.name} added to cart!`);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <button 
                        onClick={() => navigate('/home')}
                        className="hover:text-blue-600 flex items-center gap-1"
                    >
                        <FaArrowLeft className="w-3 h-3" />
                        Back to Products
                    </button>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </nav>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* Product Image */}
                        <div className="flex justify-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-md h-96 object-cover rounded-lg"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <FaStar className="w-5 h-5" />
                                        <span className="font-semibold">4.5</span>
                                        <span className="text-gray-600">(128 reviews)</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        product.inStock 
                                            ? "bg-green-100 text-green-800" 
                                            : "bg-red-100 text-red-800"
                                    }`}>
                                        {product.inStock ? "In Stock" : "Out of Stock"}
                                    </span>
                                </div>
                            </div>

                            <p className="text-3xl font-bold text-green-600">
                                ${product.price}
                            </p>

                            <p className="text-gray-700 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-4">
                                {!isAdmin && (
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={!product.inStock}
                                        className={`flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                                            product.inStock
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                    >
                                        <FaShoppingCart className="w-5 h-5" />
                                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                                    </button>
                                )}

                                {isAdmin && (
                                    <div className="py-4 px-6 bg-gray-100 text-gray-600 rounded-lg text-center">
                                        👨‍💼 Admin View - Cart Disabled
                                    </div>
                                )}

                                <Link
                                    to={`/products/${product._id}/reviews`}
                                    className="py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-center font-semibold"
                                >
                                    📝 View Reviews
                                </Link>
                            </div>

                            {/* Product Features */}
                            <div className="border-t pt-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Product Features</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• High-quality materials</li>
                                    <li>• Fast shipping available</li>
                                    <li>• 30-day return policy</li>
                                    <li>• 1-year warranty</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;