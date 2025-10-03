// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { SlHandbag } from "react-icons/sl";
// import { FaCheckCircle } from "react-icons/fa";
// import Confetti from "react-confetti";

// function CheckoutSuccess() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const total = location.state?.total || 0;

//     const[windowsize,setWindowSize]=useState({width:window.innerWidth,height:window.innerHeight})

//     useEffect(()=>{
//         const handleResize=()=>{
//             setWindowSize({width:window.innerWidth,height:window.innerHeight})
//         }
//         window.addEventListener("resize",handleResize)
//         return()=>window.removeEventListener("resize",handleResize)
//     },[])

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 animate-fadeIn">
//             {/* Confetti */}
//             <Confetti width={windowsize.width} height={windowsize.height} recycle={false} numberOfPieces={500} gravity={0.3}/>
//             <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">

//                 {/* Animated Success Icon */}
//                 <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-6 animate-bounce" />

//                 <h1 className="text-3xl font-bold text-green-700 mb-4">Checkout Successful!</h1>

//                 <p className="text-lg text-gray-700 mb-6">
//                     Thank you for your purchase. Your total payment is:
//                 </p>

//                 <p className="text-2xl font-semibold text-purple-600 mb-8">
//                     ${total.toFixed(2)}
//                 </p>

//                 {/* Continue Shopping Button */}
//                 <button
//                     onClick={() => navigate("/")}
//                     className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition ml-12 "
//                 >
//                     <SlHandbag className="text-xl" /> Continue Shopping
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default CheckoutSuccess;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaCheckCircle, FaShoppingBag, FaHome } from "react-icons/fa";

// const CheckoutSuccess: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
//         {/* Success Icon */}
//         <div className="text-green-500 text-6xl mb-6">
//           <FaCheckCircle />
//         </div>
        
//         {/* Success Message */}
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Order Successful!
//         </h1>
        
//         <p className="text-gray-600 mb-2">
//           Thank you for your purchase!
//         </p>
        
//         <p className="text-gray-600 mb-6">
//           Your order has been confirmed and will be shipped soon.
//         </p>

//         {/* Order Details */}
//         <div className="bg-gray-50 rounded-lg p-4 mb-6">
//           <p className="text-sm text-gray-600">
//             Order ID: <span className="font-mono font-semibold">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
//           </p>
//           <p className="text-sm text-gray-600 mt-2">
//             Confirmation email will be sent shortly
//           </p>
//         </div>

//         {/* Action Buttons */}
//         <div className="space-y-3">
//           <button
//             onClick={() => navigate("/orders")}
//             className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
//           >
//             <FaShoppingBag className="w-4 h-4" />
//             View My Orders
//           </button>
          
//           <button
//             onClick={() => navigate("/home")}
//             className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
//           >
//             <FaHome className="w-4 h-4" />
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutSuccess;


import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle, FaShoppingBag, FaHome } from "react-icons/fa";

const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const orderId = location.state?.orderId || Math.random().toString(36).substr(2, 9).toUpperCase();
  const total = location.state?.total || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="text-green-500 text-6xl mb-6">
          <FaCheckCircle />
        </div>
        
        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Successful!
        </h1>
        
        <p className="text-gray-600 mb-2">
          Thank you for your purchase!
        </p>
        
        <p className="text-gray-600 mb-6">
          Your order has been confirmed and will be shipped soon.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            Order ID: <span className="font-mono font-semibold">#{orderId}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Total: <span className="font-semibold">${total.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Confirmation email will be sent shortly
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            <FaShoppingBag className="w-4 h-4" />
            View My Orders
          </button>
          
          <button
            onClick={() => navigate("/home")}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
          >
            <FaHome className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;