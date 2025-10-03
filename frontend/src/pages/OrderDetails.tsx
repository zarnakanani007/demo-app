// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// interface Item {
//   product: { name: string; price: number };
//   quantity: number;
// }

// interface Order {
//   _id: string;
//   totalPrice: number;
//   items: Item[];
// }

// const OrderDetails: React.FC = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState<Order | null>(null);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`http://localhost:5000/api/orders/${id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setOrder(res.data);
//       } catch (error) {
//         console.error("Error fetching order:", error);
//       }
//     };
//     fetchOrder();
//   }, [id]);

//   if (!order) return <p>Loading...</p>;

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Order Details</h2>
//       <p><strong>Order ID:</strong> {order._id}</p>
//       <p><strong>Total:</strong> ₹{order.totalPrice}</p>

//       <h3 className="mt-4 text-lg font-semibold">Items:</h3>
//       <ul className="list-disc ml-6">
//         {order.items.map((item, i) => (
//           <li key={i}>
//             {item.product.name} × {item.quantity} = ₹{item.product.price * item.quantity}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OrderDetails;
