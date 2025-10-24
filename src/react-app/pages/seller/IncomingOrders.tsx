import { useEffect, useState } from 'react';
import { Search, Filter, Package, Clock, Truck, CheckCircle, Eye, Edit3 } from 'lucide-react';

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
  'Pending': { icon: Package, bgColor: 'bg-blue-100', textColor: 'text-blue-800', next: 'Processing', nextAction: 'Start Processing' },
  'Processing': { icon: Clock, bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', next: 'Ready to Ship', nextAction: 'Mark Ready to Ship' },
  'Ready to Ship': { icon: Package, bgColor: 'bg-purple-100', textColor: 'text-purple-800', next: 'Shipped', nextAction: 'Ship Order' },
  'Shipped': { icon: Truck, bgColor: 'bg-green-100', textColor: 'text-green-800', next: 'Delivered', nextAction: 'Mark as Delivered' },
  'Delivered': { icon: CheckCircle, bgColor: 'bg-green-100', textColor: 'text-green-800', next: null, nextAction: 'Completed' }
};

export default function IncomingOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // ✅ Load orders from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(stored.reverse());
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // ✅ Update order status and save back to localStorage
  const updateOrderStatus = (orderId: number) => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        const currentConfig = statusConfig[order.status as keyof typeof statusConfig];
        if (currentConfig.next) {
          return { ...order, status: currentConfig.next };
        }
      }
      return order;
    });
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify([...updated].reverse()));
    setSelectedOrder(null);
  };

  const getStatusIcon = (status: string) => {
    const Icon = statusConfig[status as keyof typeof statusConfig].icon;
    return <Icon className="h-4 w-4" />;
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const processingOrders = orders.filter(o => o.status === 'Processing').length;
  const readyToShip = orders.filter(o => o.status === 'Ready to Ship').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Incoming Orders</h1>
          <p className="text-gray-600 mt-1">Manage and fulfill customer orders</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-blue-600">{pendingOrders}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Ready to Ship</p>
            <p className="text-2xl font-bold text-purple-600">{readyToShip}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
            <Package className="h-8 w-8 text-gray-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-blue-600">{pendingOrders}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-yellow-600">{processingOrders}</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ready to Ship</p>
              <p className="text-2xl font-bold text-purple-600">{readyToShip}</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Truck className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => {
          const config = statusConfig[order.status as keyof typeof statusConfig];
          return (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bgColor} ${config.textColor}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{order.status}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">View Details</span>
                  </button>
                  {config.next && (
                    <button
                      onClick={() => updateOrderStatus(order.id)}
                      className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span className="text-sm">{config.nextAction}</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-600">
                📍 {order.address}
              </div>

              <div className="mt-2 font-semibold text-emerald-600">
                ₹{order.total.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}
