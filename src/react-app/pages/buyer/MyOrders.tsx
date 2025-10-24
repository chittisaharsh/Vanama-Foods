import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useToast } from "@/react-app/context/ToastContext";
import { getOrders, listenForOrderChanges } from "@/utils/orders";

// 🎨 Status color mapping
const statusConfig = {
  'Processing': { icon: Clock, color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  'In Transit': { icon: Truck, color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
  'Delivered': { icon: CheckCircle, color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  'Cancelled': { icon: AlertCircle, color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' }
};

export default function MyOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const { showToast } = useToast();

  // 🧠 Load orders from localStorage and listen for updates
  useEffect(() => {
    setOrders(getOrders().reverse());

    const unsubscribe = listenForOrderChanges(() => {
      setOrders(getOrders().reverse());
      showToast('🚚 Order status updated!', 'info');
    });

    return unsubscribe;
  }, []);

  // 📝 Filtering logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.seller || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // 🟡 Return status icon
  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config?.icon || Clock; // ✅ fallback
    return <IconComponent className="h-4 w-4" />;
  };

  // ✅ Safe fallback function for undefined statuses
  const getStatusColor = (status: string) => {
    return (
      statusConfig[status as keyof typeof statusConfig] || {
        icon: Clock,
        color: "gray",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
      }
    );
  };

  const totalSpent = orders
    .filter(o => o.status === 'Delivered')
    .reduce((sum, order) => sum + order.total, 0);

  const activeOrders = orders.filter(o => ['Processing', 'In Transit'].includes(o.status)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage your order history</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Spent</p>
            <p className="text-2xl font-bold text-emerald-600">₹{totalSpent.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Active Orders</p>
            <p className="text-2xl font-bold text-blue-600">{activeOrders}</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="All">All Status</option>
                <option value="Processing">Processing</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const statusColors = getStatusColor(order.status);
          return (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusColors.bgColor} ${statusColors.textColor}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{order.status || "Unknown"}</span>
                  </span>
                </div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">View Details</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-medium">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seller</p>
                  <p className="font-medium">{order.seller || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-medium text-emerald-600">
                    ₹{order.total.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    {order.items.map((item: any, index: number) => (
                      <p key={index} className="text-sm text-gray-600">
                        {item.name} - {item.quantity}
                        {item.unit} @ ₹{item.price}/{item.unit}
                      </p>
                    ))}
                  </div>
                  {order.trackingId && (
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tracking ID</p>
                      <p className="font-mono text-sm font-medium">
                        {order.trackingId}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Top Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status).bgColor} ${getStatusColor(selectedOrder.status).textColor}`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    <span className="ml-1">{selectedOrder.status || "Unknown"}</span>
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seller</p>
                  <p className="font-medium">{selectedOrder.seller || "—"}</p>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Items Ordered</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-100"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity}
                          {item.unit} @ ₹{item.price}/{item.unit}
                        </p>
                      </div>
                      <p className="font-medium">
                        ₹{(item.quantity * item.price).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{selectedOrder.subtotal?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{selectedOrder.shipping?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>₹{selectedOrder.total?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Tracking Info */}
              {selectedOrder.trackingId && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tracking Information</h3>
                  <p className="text-sm text-gray-600">
                    Tracking ID:{" "}
                    <span className="font-mono">{selectedOrder.trackingId}</span>
                  </p>
                  {selectedOrder.expectedDelivery && (
                    <p className="text-sm text-gray-600">
                      Expected Delivery: {selectedOrder.expectedDelivery}
                    </p>
                  )}
                  {selectedOrder.actualDelivery && (
                    <p className="text-sm text-gray-600">
                      Delivered On: {selectedOrder.actualDelivery}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No orders found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
}
