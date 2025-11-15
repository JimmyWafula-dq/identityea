import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ApiProvider } from "./context/ApiContext";
import { QuoteCartProvider } from "./context/QuoteCartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QuoteCartProvider>
        <CartProvider>
          <AuthProvider>
            <ApiProvider>
              <Toaster position="top-center" />
              <App />
            </ApiProvider>
          </AuthProvider>
        </CartProvider>
      </QuoteCartProvider>
    </BrowserRouter>
  </StrictMode>
);
