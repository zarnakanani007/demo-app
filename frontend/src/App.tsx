
// import React, { useState } from "react";
// import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState, AppDispatch } from "./redux/store";
// import { logout } from "./redux/authSlice";
// import { FaShoppingCart } from "react-icons/fa";

// // Pages
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import UserDashboard from "./pages/UserDashboard";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/profile";
// import Cart from "./pages/cart";
// import Orders from "./pages/Orders";
// import CreateProduct from "./pages/createProducts";
// import UsersPage from "./pages/UserPages";
// import ProductsPage from "./pages/ProductPage";
// import EditProfile from "./pages/EditProfile";
// import CheckoutConfirmation from "./pages/CheckoutConfirmation";
// import CheckoutSuccess from "./pages/CheckoutSuccess";
// import ProductDetails from "./pages/productDetails";

// // Components
// import ProtectedRoute from "./components/ProtectedRoute";
// import { Toaster } from "react-hot-toast";
// import AdminOrders from "./pages/AdminOrders";
// import AdminOrderDetails from "./pages/AdminOrdersDetails";
// import AdminAnalytics from "./pages/AdminAnalytics";
// import ProductReviews from "./pages/productReviews";

// const App: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const { token, user } = useSelector((state: RootState) => state.auth);
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   // Role-aware NavBar links
//   const navLinks = !token
//     ? [
//         { name: "Register", path: "/register", color: "green" },
//         { name: "Login", path: "/login", color: "blue" },
//       ]
//     : user?.role === "admin"
//     ? [
//         { name: "Dashboard", path: "/dashboard", color: "indigo" },
//         { name: "Create Product", path: "/dashboard/create-product", color: "blue" },
//         { name: "View Users", path: "/dashboard/users", color: "green" },
//         { name: "View Products", path: "/dashboard/products", color: "purple" },
//         { name: "Profile", path: "/profile", color: "black" },
//       ]
//     : [
//         { name: "Home", path: "/home", color: "purple" },
//         { name: "Profile", path: "/profile", color: "black" },
//         { name: "Orders", path: "/orders", color: "black" },
//       ];

//   const getLinkClasses = (isActive: boolean, link: any) =>
//     `${isActive ? `bg-${link.color}-600 text-white` : `text-${link.color}-600 hover:bg-${link.color}-100`} px-4 py-2 rounded-md font-semibold`;

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
//         <div className="text-2xl font-bold text-gray-800">MyDemoApp</div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex gap-4 items-center">
//           {navLinks.map((link) => (
//             <NavLink key={link.name} to={link.path} className={({ isActive }) => getLinkClasses(isActive, link)}>
//               {link.name}
//             </NavLink>
//           ))}

//           {/* Cart icon ONLY for normal users */}
//           {token && user?.role !== "admin" && (
//             <div className="relative group px-4 py-2 rounded-md text-yellow-600 hover:bg-yellow-100 cursor-pointer">
//               <NavLink to="/cart">
//                 <FaShoppingCart className="w-5 h-5 inline" />
//                 {cartItems.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </NavLink>
//               {cartItems.length > 0 && (
//                 <div className="absolute hidden group-hover:block top-8 right-0 bg-black text-white border shadow-md rounded-md px-3 py-2 w-40 text-sm z-50">
//                   <p className="font-semibold">Items: {cartItems.length}</p>
//                   <p className="font-bold">Total: ${cartTotal.toFixed(2)}</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Logout button */}
//           {token && (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 rounded-md font-semibold bg-red-600 text-white hover:bg-red-700"
//             >
//               Logout
//             </button>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden text-gray-800 focus:outline-none" onClick={toggleMobileMenu}>
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//             />
//           </svg>
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-md flex flex-col gap-2 px-4 py-3">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.name}
//               to={link.path}
//               onClick={() => setIsMobileMenuOpen(false)}
//               className={({ isActive }) => getLinkClasses(isActive, link)}
//             >
//               {link.name}
//             </NavLink>
//           ))}

//           {/* Mobile Cart icon ONLY for normal users */}
//           {token && user?.role !== "admin" && (
//             <NavLink
//               to="/cart"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="relative px-4 py-2 rounded-md text-yellow-600 hover:bg-yellow-100"
//             >
//               <FaShoppingCart className="w-5 h-5 inline" />
//               {cartItems.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {cartItems.length}
//                 </span>
//               )}
//             </NavLink>
//           )}

//           {token && (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setIsMobileMenuOpen(false);
//               }}
//               className="px-4 py-2 font-semibold text-red-600 hover:bg-red-100 rounded"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}

//       {/* Toast notifications */}
//       <Toaster position="top-center" />

//       {/* Routes - PROPERLY ORDERED AND PROTECTED */}
//       <Routes>
//         {/* Public Routes - Redirect if already logged in */}
//         <Route
//           path="/register"
//           element={
//             <ProtectedRoute redirectIfLoggedIn>
//               <Register />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <ProtectedRoute redirectIfLoggedIn>
//               <Login />
//             </ProtectedRoute>
//           }
//         />

//         {/* ✅ Product Routes - Allow both users AND admins */}
//         <Route
//           path="/products/:id"
//           element={
//             <ProtectedRoute> {/* No restrictions - both can view products */}
//               <ProductDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/products/:id/reviews"
//           element={
//             <ProtectedRoute> {/* No restrictions - both can view reviews */}
//               <ProductReviews />
//             </ProtectedRoute>
//           }
//         />

//         {/* User-Only Routes - Block admin access */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute allowAdmin={false}> {/* ❌ Block admin */}
//               <UserDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute allowAdmin={false}> {/* ❌ Block admin */}
//               <Cart />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/orders"
//           element={
//             <ProtectedRoute allowAdmin={false}> {/* ❌ Block admin */}
//               <Orders />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/checkout-confirmation"
//           element={
//             <ProtectedRoute allowAdmin={false}> {/* ❌ Block admin */}
//               <CheckoutConfirmation />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/checkout-success"
//           element={
//             <ProtectedRoute allowAdmin={false}> {/* ❌ Block admin */}
//               <CheckoutSuccess />
//             </ProtectedRoute>
//           }
//         />

//         {/* Shared Routes - Allow both users and admins */}
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute> {/* ✅ Both can access */}
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/edit-profile"
//           element={
//             <ProtectedRoute> {/* ✅ Both can access */}
//               <EditProfile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Admin Only Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute adminOnly> {/* ✅ Admin only */}
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/create-product"
//           element={
//             <ProtectedRoute adminOnly>
//               <CreateProduct />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/users"
//           element={
//             <ProtectedRoute adminOnly>
//               <UsersPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/products"
//           element={
//             <ProtectedRoute adminOnly>
//               <ProductsPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/orders"
//           element={
//             <ProtectedRoute adminOnly>
//               <AdminOrders />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/orders/:id"
//           element={
//             <ProtectedRoute adminOnly>
//               <AdminOrderDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/analytics"
//           element={
//             <ProtectedRoute adminOnly>
//               <AdminAnalytics />
//             </ProtectedRoute>
//           }
//         />

//         {/* Default Route - Redirect based on role */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               {user?.role === "admin" ? <Dashboard /> : <UserDashboard />}
//             </ProtectedRoute>
//           }
//         />

//         {/* 404 Fallback */}
//         <Route path="*" element={
//           <div className="min-h-screen flex items-center justify-center">
//             <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
//           </div>
//         } />
//       </Routes>
//     </>
//   );
// };

// export default App;


import React, { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./redux/store";
import { logout } from "./redux/authSlice";
import { FaShoppingCart } from "react-icons/fa";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile";
import Cart from "./pages/cart";
import Orders from "./pages/Orders";
import CreateProduct from "./pages/createProducts";
import UsersPage from "./pages/UserPages";
import ProductsPage from "./pages/ProductPage";
import EditProfile from "./pages/EditProfile";
import CheckoutConfirmation from "./pages/CheckoutConfirmation";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import ProductDetails from "./pages/productDetails";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import AdminOrders from "./pages/AdminOrders";
import AdminOrderDetails from "./pages/AdminOrdersDetails";
import AdminAnalytics from "./pages/AdminAnalytics";
import ProductReviews from "./pages/productReviews";

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { token, user } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Role-aware NavBar links
  const navLinks = !token
    ? [
        { name: "Register", path: "/register", color: "green" },
        { name: "Login", path: "/login", color: "blue" },
      ]
    : user?.role === "admin"
    ? [
        { name: "Dashboard", path: "/dashboard", color: "indigo" },
        { name: "Create Product", path: "/dashboard/create-product", color: "blue" },
        { name: "View Users", path: "/dashboard/users", color: "green" },
        { name: "View Products", path: "/dashboard/products", color: "purple" },
        { name: "Profile", path: "/profile", color: "black" },
      ]
    : [
        { name: "Home", path: "/home", color: "purple" },
        { name: "Profile", path: "/profile", color: "black" },
        { name: "Orders", path: "/orders", color: "black" },
      ];

  const getLinkClasses = (isActive: boolean, link: any) =>
    `${isActive ? `bg-${link.color}-600 text-white` : `text-${link.color}-600 hover:bg-${link.color}-100`} px-4 py-2 rounded-md font-semibold`;

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800">MyDemoApp</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={({ isActive }) => getLinkClasses(isActive, link)}>
              {link.name}
            </NavLink>
          ))}

          {/* Cart icon ONLY for normal users */}
          {token && user?.role !== "admin" && (
            <div className="relative group px-4 py-2 rounded-md text-yellow-600 hover:bg-yellow-100 cursor-pointer">
              <NavLink to="/cart">
                <FaShoppingCart className="w-5 h-5 inline" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </NavLink>
              {cartItems.length > 0 && (
                <div className="absolute hidden group-hover:block top-8 right-0 bg-black text-white border shadow-md rounded-md px-3 py-2 w-40 text-sm z-50">
                  <p className="font-semibold">Items: {cartItems.length}</p>
                  <p className="font-bold">Total: ${cartTotal.toFixed(2)}</p>
                </div>
              )}
            </div>
          )}

          {/* Logout button */}
          {token && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md font-semibold bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 focus:outline-none" onClick={toggleMobileMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col gap-2 px-4 py-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => getLinkClasses(isActive, link)}
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Cart icon ONLY for normal users */}
          {token && user?.role !== "admin" && (
            <NavLink
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative px-4 py-2 rounded-md text-yellow-600 hover:bg-yellow-100"
            >
              <FaShoppingCart className="w-5 h-5 inline" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          )}

          {token && (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-2 font-semibold text-red-600 hover:bg-red-100 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* Toast notifications */}
      <Toaster position="top-center" />

      {/* Routes - SIMPLIFIED AND CORRECT ORDER */}
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Product Routes - MUST COME FIRST */}
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/:id/reviews" element={<ProductReviews />} />

        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute allowAdmin={false}><Cart /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute allowAdmin={false}><Orders /></ProtectedRoute>} />
        <Route path="/checkout-confirmation" element={<ProtectedRoute allowAdmin={false}><CheckoutConfirmation /></ProtectedRoute>} />
        <Route path="/checkout-success" element={<ProtectedRoute allowAdmin={false}><CheckoutSuccess /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/dashboard" element={<ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/create-product" element={<ProtectedRoute adminOnly><CreateProduct /></ProtectedRoute>} />
        <Route path="/dashboard/users" element={<ProtectedRoute adminOnly><UsersPage /></ProtectedRoute>} />
        <Route path="/dashboard/products" element={<ProtectedRoute adminOnly><ProductsPage /></ProtectedRoute>} />
        <Route path="/dashboard/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
        <Route path="/dashboard/orders/:id" element={<ProtectedRoute adminOnly><AdminOrderDetails /></ProtectedRoute>} />
        <Route path="/dashboard/analytics" element={<ProtectedRoute adminOnly><AdminAnalytics /></ProtectedRoute>} />

        {/* Default Route */}
        <Route path="/" element={<ProtectedRoute>{user?.role === "admin" ? <Dashboard /> : <UserDashboard />}</ProtectedRoute>} />

        {/* 404 Fallback */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">404 - Page Not Found</h1></div>} />
      </Routes>
    </>
  );
};

export default App;



