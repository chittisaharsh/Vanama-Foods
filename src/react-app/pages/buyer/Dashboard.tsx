import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  CreditCard,
  Bell,
  TrendingUp,
  Package,
  Clock,
} from "lucide-react";
import MetricCard from "@/react-app/components/MetricCard";

const recentOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-08",
    items: "Basmati Rice (50kg), Toor Dal (25kg)",
    amount: "₹8,750",
    status: "Delivered",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-06",
    items: "Moong Dal (20kg), Wheat Flour (40kg)",
    amount: "₹5,200",
    status: "In Transit",
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-04",
    items: "Masoor Dal (30kg)",
    amount: "₹3,450",
    status: "Processing",
  },
];

const announcements = [
  {
    id: 1,
    title: "New Organic Rice Varieties Available",
    message:
      "Premium organic basmati and brown rice now available from certified mills.",
    time: "2 hours ago",
    type: "product",
  },
  {
    id: 2,
    title: "Extended Credit Limit",
    message:
      "Your BNPL credit limit has been increased to ₹1,50,000 based on your payment history.",
    time: "1 day ago",
    type: "credit",
  },
  {
    id: 3,
    title: "Festival Season Offers",
    message:
      "Special discounts on bulk orders during the festive season. Check marketplace for details.",
    time: "2 days ago",
    type: "offer",
  },
];

const quickStats = [
  {
    label: "This Month Orders",
    value: "12",
    change: "+3",
    icon: ShoppingCart,
    color: "emerald",
  },
  {
    label: "Total Spent",
    value: "₹45,200",
    change: "+15%",
    icon: TrendingUp,
    color: "blue",
  },
  {
    label: "Credit Available",
    value: "₹1,05,000",
    change: "₹45k used",
    icon: CreditCard,
    color: "purple",
  },
  {
    label: "Avg Delivery Time",
    value: "2.5 days",
    change: "-0.5 days",
    icon: Clock,
    color: "orange",
  },
];

export default function BuyerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here’s your business overview.
          </p>
        </div>
        <button
          onClick={() => navigate("/marketplace")}
          className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-medium shadow-md hover:bg-emerald-700 hover:shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Browse Marketplace</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => (
          <MetricCard
            key={stat.label}
            title={stat.label}
            value={stat.value}
            change={stat.change}
            changeType="increase"
            icon={stat.icon}
            iconColor={`text-${stat.color}-600`}
          />
        ))}
      </div>

      {/* Recent Orders & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-emerald-600" />
              Recent Orders
            </h3>
            <button
              onClick={() => navigate("/orders")}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "In Transit"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{order.items}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{order.date}</span>
                  <span className="font-medium text-gray-900">
                    {order.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-emerald-600" />
              Announcements
            </h3>
          </div>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-full flex-shrink-0 ${
                      announcement.type === "product"
                        ? "bg-blue-100"
                        : announcement.type === "credit"
                        ? "bg-purple-100"
                        : "bg-orange-100"
                    }`}
                  >
                    {announcement.type === "product" && (
                      <Package className="h-4 w-4 text-blue-600" />
                    )}
                    {announcement.type === "credit" && (
                      <CreditCard className="h-4 w-4 text-purple-600" />
                    )}
                    {announcement.type === "offer" && (
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {announcement.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {announcement.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {announcement.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Credit Summary */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Credit Account Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-emerald-100 text-sm">Credit Limit</p>
                <p className="text-2xl font-bold">₹1,50,000</p>
              </div>
              <div>
                <p className="text-emerald-100 text-sm">Available Balance</p>
                <p className="text-2xl font-bold">₹1,05,000</p>
              </div>
              <div>
                <p className="text-emerald-100 text-sm">Outstanding</p>
                <p className="text-2xl font-bold">₹45,000</p>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <CreditCard className="h-16 w-16 text-white opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
