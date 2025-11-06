// src/App.jsx
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPage from "./pages/auth/ForgotPage";
import ProductsPage from "./pages/ProductsPage";
import ProductView from "./pages/ProductView";
import CartPage from "./pages/CartPage";
import ScrollToTop from "./layout/ScrollToTop";
import { ProfilePage } from "./pages/ProfilePage";
import { ProtectedRoute } from "./pages/auth/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot" element={<ForgotPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/view/:name" element={<ProductView />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Protected Route: Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
