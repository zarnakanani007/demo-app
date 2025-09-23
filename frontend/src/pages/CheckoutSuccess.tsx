import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SlHandbag } from "react-icons/sl";
import { FaCheckCircle } from "react-icons/fa";
import Confetti from "react-confetti";

function CheckoutSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const total = location.state?.total || 0;

    const[windowsize,setWindowSize]=useState({width:window.innerWidth,height:window.innerHeight})

    useEffect(()=>{
        const handleResize=()=>{
            setWindowSize({width:window.innerWidth,height:window.innerHeight})
        }
        window.addEventListener("resize",handleResize)
        return()=>window.removeEventListener("resize",handleResize)
    },[])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 animate-fadeIn">
            {/* Confetti */}
            <Confetti width={windowsize.width} height={windowsize.height} recycle={false} numberOfPieces={500} gravity={0.3}/>
            <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">

                {/* Animated Success Icon */}
                <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-6 animate-bounce" />

                <h1 className="text-3xl font-bold text-green-700 mb-4">Checkout Successful!</h1>

                <p className="text-lg text-gray-700 mb-6">
                    Thank you for your purchase. Your total payment is:
                </p>

                <p className="text-2xl font-semibold text-purple-600 mb-8">
                    ${total.toFixed(2)}
                </p>

                {/* Continue Shopping Button */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition ml-12 "
                >
                    <SlHandbag className="text-xl" /> Continue Shopping
                </button>
            </div>
        </div>
    );
}

export default CheckoutSuccess;
