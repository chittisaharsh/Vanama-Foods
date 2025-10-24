import { Package, ShoppingCart, TrendingUp, DollarSign, Star, AlertTriangle } from 'lucide-react';
import MetricCard from '@/react-app/components/MetricCard';
import Chart from '@/react-app/components/Chart';

const salesData = [
  { name: 'Jan', value: 125000 },
  { name: 'Feb', value: 138000 },
  { name: 'Mar', value: 142000 },
  { name: 'Apr', value: 158000 },
  { name: 'May', value: 165000 },
  { name: 'Jun', value: 178000 },
];

const topProducts = [
  { name: 'Premium Basmati Rice', sales: 2500, revenue: 450000, growth: '+15%' },
  { name: 'Organic Toor Dal', sales: 1800, revenue: 171000, growth: '+8%' },
  { name: 'Brown Rice Organic', sales: 950, revenue: 114000, growth: '+22%' },
  { name: 'Whole Wheat Flour', sales: 3200, revenue: 144000, growth: '+5%' },
];

const recentOrders = [
  { id: 'ORD-2024-101', buyer: 'VANAMA Store', items: 'Basmati Rice (50kg)', amount: 9000, status: 'New', time: '2 hours ago' },
  { id: 'ORD-2024-102', buyer: 'VANAMA Store', items: 'Toor Dal (100kg)', amount: 9500, status: 'Processing', time: '4 hours ago' },
  { id: 'ORD-2024-103', buyer: 'VANAMA Store', items: 'Brown Rice (25kg)', amount: 3000, status: 'Ready to Ship', time: '6 hours ago' },
  { id: 'ORD-2024-104', buyer: 'VANAMA Store', items: 'Wheat Flour (200kg)', amount: 9000, status: 'Shipped', time: '1 day ago' },
];

const lowStockAlerts = [
  { product: 'Premium Basmati Rice', currentStock: 150, reorderLevel: 200, unit: 'kg' },
  { product: 'Moong Dal', currentStock: 75, reorderLevel: 100, unit: 'kg' },
];

export default function SellerDashboard() {
  const totalRevenue = 806000;
  const totalOrders = 156;
  const activeProducts = 12;
  const avgRating = 4.7;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manufacturer Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your sales performance and manage orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add New Product
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`₹${(totalRevenue / 1000).toFixed(0)}K`}
          change="+18.2%"
          changeType="increase"
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <MetricCard
          title="Orders This Month"
          value={totalOrders}
          change="+12"
          changeType="increase"
          icon={ShoppingCart}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Active Products"
          value={activeProducts}
          change="+2"
          changeType="increase"
          icon={Package}
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Average Rating"
          value={avgRating}
          change="+0.3"
          changeType="increase"
          icon={Star}
          iconColor="text-yellow-600"
        />
      </div>

      {/* Low Stock Alerts */}
      {lowStockAlerts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-orange-900">Low Stock Alerts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lowStockAlerts.map((alert, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{alert.product}</p>
                    <p className="text-sm text-gray-600">
                      Current: {alert.currentStock}{alert.unit} | Reorder at: {alert.reorderLevel}{alert.unit}
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors">
                    Restock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend (Last 6 Months)</h3>
          <Chart
            type="line"
            data={salesData}
            dataKey="value"
            xKey="name"
            color="#3b82f6"
            height={250}
          />
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Top Performing Products
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">₹{(product.revenue / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-green-600">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
            Recent Orders
          </h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Buyer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Items</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{order.buyer}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.items}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">₹{order.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Ready to Ship' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
