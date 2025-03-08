import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./components/Order/CartContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar/Navbar";
import ProductDetail from "./components/Food/ProductDetail";
import Menu from "./components/Menu/Menu";
import AdminDashboard from "./components/Management/Dashboard/AdminDashboard";
import EmployeeManagement from "./components/Management/Employees/EmployeeManagement";
import ManagementLayout from "./components/Layout/ManagementLayout";
import ProductManagement from "./components/Management/Products/ProductManagement";
import ManagerLogin from "./components/Login_Signup/ManagerLogin";
import ManagerSignup from "./components/Login_Signup/ManagerSignup";
import Settings from "./components/Management/Setting/Setting";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import FeedbackManagement from "./components/Management/Feedbacks/FeedbackManagement";
import BookingManagement from "./components/Management/Bookings/BookingManagement";
import PaymentManagement from "./components/Management/Payments/PaymentManagement";

const AppContent = ({ theme, setTheme }) => {
  const location = useLocation();

  const hideNavbarPaths = ["/feedback-management", "/payment-management", "/booking_management", "/manager-login", "/manager-signup", "/admin-dashboard", "/employee-management", "/product-management", "/settings", "/login", "/signup"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div
      className={`${
        theme === "light" ? "bg-white text-black" : "bg-slate-900 text-white"
      } transition-colors min-h-screen`}
    >
      {shouldShowNavbar && <Navbar theme={theme} setTheme={setTheme} />}
      <Routes>
        {/* Routes for the pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/manager-signup" element={<ManagerSignup />} />

        {/* Management section wrapped with Layout */}
        <Route element={<ManagementLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/employee-management" element={<EmployeeManagement />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/booking_management" element={<BookingManagement />} />
          <Route path="/payment-management" element={<PaymentManagement />} />
          <Route path="/feedback-management" element={<FeedbackManagement />} />
        </Route>

        {/* General pages */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <CartProvider>
      <Router>
        <AuthProvider>
        <ProductProvider>
          <AppContent theme={theme} setTheme={setTheme} />
          </ProductProvider>
        </AuthProvider>
      </Router>
    </CartProvider>
  );
}

export default App;
