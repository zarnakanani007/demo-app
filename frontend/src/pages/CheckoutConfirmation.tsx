import React from "react";
import { Link } from "react-router-dom";


function CheckoutConfirmation(){
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
           <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
            <h1 className="text-3xl font-bold text-green-700 mb-4">Checkout Successfully!</h1>
            <p className="text-gray-700 mb-6">
                Thankyou for your purchase.Your order has been placed Successfully.
            </p>
            <Link to="/" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                Back to Home!
            </Link>
           </div>
        </div>
    )
}

export default CheckoutConfirmation