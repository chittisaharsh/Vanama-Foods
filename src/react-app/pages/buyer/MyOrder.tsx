import { useEffect, useState } from "react";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  address: string;
  status: string;
  date: string;
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders.reverse()); // show latest first
  }, []);

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        You haven’t placed any orders yet 📝
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg bg-white shadow-sm p-4 space-y-3"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">Order #{order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="divide-y divide-gray-200">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between py-2 text-sm text-gray-700"
              >
                <span>{item.name} × {item.quantity}{item.unit}</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-gray-800 font-semibold pt-2">
            <span>Total</span>
            <span>₹{order.total.toLocaleString()}</span>
          </div>

          <div className="text-sm text-gray-600">
            📍 <strong>Address:</strong> {order.address}
          </div>
        </div>
      ))}
    </div>
  );
}
