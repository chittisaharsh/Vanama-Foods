import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/react-app/App";
import "./index.css";
import { ToastProvider } from "@/react-app/context/ToastContext";
import { CartProvider } from "@/react-app/context/CartContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </CartProvider>
  </React.StrictMode>
);
