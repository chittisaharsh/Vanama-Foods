import { useEffect, useState } from "react";
import { Search, Filter, Package, Clock, Truck, CheckCircle, Eye } from "lucide-react";
//import { getOrders, listenForOrderChanges } from "../../../utils/orders";
//import { getOrders, listenForOrderChanges } from "../../../../utils/orders";
//import { getOrders, updateOrder,listenForOrderChanges } from "@/react-app/utils/orders";
import { getOrders, updateOrder, listenForOrderChanges } from "@/utils/orders";




interface OrderItem {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  address: string;
  status: string;
  date: string;
}

const statusConfig = {
  'Pending': { icon: Package, bg: 'bg-blue-100', text: 'text-blue-800' },
  'Processing': { icon: Clock, bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'Ready to Ship': { icon: Package, bg: 'bg-purple-100', text: 'text-purple-800' },
  'Shipped': { icon: Truck, bg: 'bg-green-100', text: 'text-green-800' },
  'Delivered': { icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-800' },
};

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Load orders from localStorage
useEffect(() => {
  // ✅ Load initial orders from localStorage
  setOrders(getOrders().reverse());

  // ✅ Listen for changes in localStorage (Buyer or Seller actions)
  const unsubscribe = listenForOrderChanges(() => {
    setOrders(getOrders().reverse());
  });

  return unsubscribe;
}, []);


  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    const Icon = statusConfig[status as keyof typeof statusConfig].icon;
    return <Icon className="h-4 w-4" />;
  };

  // Quick stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const shippedOrders = orders.filter(o => o.status === 'Shipped').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600 mt-1">View and manage all customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          </div>
          <Package className="h-8 w-8 text-gray-600" />
        </div>
        <div className="bg-white rounded-lg border p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-blue-600">{pendingOrders}</p>
          </div>
          <Package className="h-8 w-8 text-blue-600" />
        </div>
        <div className="bg-white rounded-lg border p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Shipped</p>
            <p className="text-2xl font-bold text-green-600">{shippedOrders}</p>
          </div>
          <Truck className="h-8 w-8 text-green-600" />
        </div>
        <div className="bg-white rounded-lg border p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Delivered</p>
            <p className="text-2xl font-bold text-emerald-600">{deliveredOrders}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-emerald-600" />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Ready to Ship">Ready to Ship</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3 font-medium text-gray-600">Order ID</th>
              <th className="p-3 font-medium text-gray-600">Date</th>
              <th className="p-3 font-medium text-gray-600">Address</th>
              <th className="p-3 font-medium text-gray-600">Total</th>
              <th className="p-3 font-medium text-gray-600">Status</th>
              <th className="p-3 font-medium text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => {
              const config = statusConfig[order.status as keyof typeof statusConfig];
              return (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3 max-w-xs truncate">{order.address}</td>
                  <td className="p-3 font-medium text-emerald-600">₹{order.total.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:underline flex items-center justify-end space-x-1 ml-auto"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Order #{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date: {selectedOrder.date}</p>
              <p className="text-sm text-gray-600">Address: {selectedOrder.address}</p>
              <p className="text-sm font-medium mt-2 text-emerald-600">
                Total: ₹{selectedOrder.total.toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Items</h3>
              <ul className="text-sm space-y-1">
                {selectedOrder.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} — {item.quantity}{item.unit} × ₹{item.price}/{item.unit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
