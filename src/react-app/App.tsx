import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ✅ Toast notifications provider
import { ToastProvider } from "@/react-app/context/ToastContext";

// Layouts
import LandingPage from "@/react-app/pages/LandingPage";
import LoginScreen from "@/react-app/pages/LoginScreen";
import BuyerLayout from "@/react-app/components/BuyerLayout";
import SellerLayout from "@/react-app/components/SellerLayout";
import BrokerLayout from "@/react-app/components/BrokerLayout";
import AdminLayout from "@/react-app/components/AdminLayout";

// Buyer Pages
import BuyerDashboard from "@/react-app/pages/buyer/Dashboard";
import Marketplace from "@/react-app/pages/buyer/Marketplace";
import MyOrders from "@/react-app/pages/buyer/MyOrders";
import Credit from "@/react-app/pages/buyer/Credit";
import CartPage from "@/react-app/pages/buyer/CartPage";
import CheckoutPage from "@/react-app/pages/buyer/CheckoutPage";

// Seller Pages
import SellerDashboard from "@/react-app/pages/seller/Dashboard";
import MyProducts from "@/react-app/pages/seller/MyProducts";
import IncomingOrders from "@/react-app/pages/seller/IncomingOrders";

// Broker Pages
import BrokerDashboard from "@/react-app/pages/broker/Dashboard";
import MyBuyers from "@/react-app/pages/broker/MyBuyers";
import EarningsReport from "@/react-app/pages/broker/EarningsReport";
import OnboardBuyer from "@/react-app/pages/broker/OnboardBuyer";

// Admin Pages
import AdminDashboard from "@/react-app/pages/admin/Dashboard";
import UserManagement from "@/react-app/pages/admin/UserManagement";
import ProductManagement from "@/react-app/pages/admin/ProductManagement";
import OrderManagement from "@/react-app/pages/admin/OrderManagement";

export type UserRole = "buyer" | "seller" | "broker" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* 🌍 Public Routes */}
          {!user && (
            <>
              <Route path="/" element={<LandingPage onLogin={() => {}} />} />
              <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}

          {/* 🛒 Buyer Routes */}
          {user?.role === "buyer" && (
            <Route
              path="/"
              element={<BuyerLayout user={user} onLogout={handleLogout} />}
            >
              <Route index element={<BuyerDashboard />} />
              <Route path="marketplace" element={<Marketplace />} /> {/* ✅ Your marketplace route */}
              <Route path="orders" element={<MyOrders />} />
              <Route path="credit" element={<Credit />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
            </Route>
          )}

          {/* 🧺 Seller Routes */}
          {user?.role === "seller" && (
            <Route
              path="/"
              element={<SellerLayout user={user} onLogout={handleLogout} />}
            >
              <Route index element={<SellerDashboard />} />
              <Route path="products" element={<MyProducts />} />
              <Route path="orders" element={<IncomingOrders />} />
            </Route>
          )}

          {/* 🤝 Broker Routes */}
          {user?.role === "broker" && (
            <Route
              path="/"
              element={<BrokerLayout user={user} onLogout={handleLogout} />}
            >
              <Route index element={<BrokerDashboard />} />
              <Route path="buyers" element={<MyBuyers />} />
              <Route path="earnings" element={<EarningsReport />} />
              <Route path="onboard" element={<OnboardBuyer />} />
            </Route>
          )}

          {/* 🧑‍💼 Admin Routes */}
          {user?.role === "admin" && (
            <Route
              path="/"
              element={<AdminLayout user={user} onLogout={handleLogout} />}
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="orders" element={<OrderManagement />} />
            </Route>
          )}
        </Routes>
      </Router>
    </ToastProvider>
  );
}
