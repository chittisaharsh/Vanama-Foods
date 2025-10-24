import { useState } from 'react';
import { ShoppingCart, Plus, Search, Filter, Eye, Edit, TrendingUp } from 'lucide-react';
import MetricCard from '@/react-app/components/MetricCard';
import Chart from '@/react-app/components/Chart';

// Mock data for sales
const salesOrders = [
  { id: 1, orderNumber: 'SO-2024-001', customer: 'Whole Foods Market', contact: 'Sarah Johnson', date: '2024-01-08', status: 'Fulfilled', amount: '$8,750', items: 12 },
  { id: 2, orderNumber: 'SO-2024-002', customer: 'Green Valley Co-op', contact: 'Mike Chen', date: '2024-01-07', status: 'Pending', amount: '$5,200', items: 8 },
  { id: 3, orderNumber: 'SO-2024-003', customer: 'Organic Market Plus', contact: 'Lisa Rodriguez', date: '2024-01-06', status: 'Processing', amount: '$12,300', items: 15 },
  { id: 4, orderNumber: 'SO-2024-004', customer: 'Fresh & Natural Foods', contact: 'David Park', date: '2024-01-05', status: 'Draft', amount: '$3,450', items: 6 },
  { id: 5, orderNumber: 'SO-2024-005', customer: 'Earth Friendly Grocers', contact: 'Emily White', date: '2024-01-08', status: 'Fulfilled', amount: '$9,850', items: 11 },
];

const salesByProduct = [
  { name: 'Organic Rice', value: 125000, units: 2500 },
  { name: 'Quinoa', value: 98000, units: 1800 },
  { name: 'Chia Seeds', value: 75000, units: 1200 },
  { name: 'Coconut Oil', value: 62000, units: 950 },
  { name: 'Hemp Seeds', value: 48000, units: 800 },
];

const monthlySales = [
  { name: 'Jul', value: 285000 },
  { name: 'Aug', value: 312000 },
  { name: 'Sep', value: 298000 },
  { name: 'Oct', value: 345000 },
  { name: 'Nov', value: 378000 },
  { name: 'Dec', value: 410000 },
  { name: 'Jan', value: 425000 },
];

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = salesOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Management</h1>
          <p className="text-gray-600 mt-1">Track sales orders, performance, and customer relationships</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Order</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Revenue"
          value="$425,000"
          change="+12.8%"
          changeType="increase"
          icon={TrendingUp}
          iconColor="text-green-600"
        />
        <MetricCard
          title="Orders This Month"
          value="147"
          change="+8.5%"
          changeType="increase"
          icon={ShoppingCart}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Average Order Value"
          value="$2,891"
          change="+4.2%"
          changeType="increase"
          icon={TrendingUp}
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Conversion Rate"
          value="3.8%"
          change="+0.3%"
          changeType="increase"
          icon={TrendingUp}
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="line"
          data={monthlySales}
          dataKey="value"
          xKey="name"
          color="#10b981"
          title="Sales Trend (Last 7 Months)"
          height={300}
        />
        <Chart
          type="bar"
          data={salesByProduct}
          dataKey="value"
          xKey="name"
          color="#3b82f6"
          title="Top Products by Revenue"
          height={300}
        />
      </div>

      {/* Filters and Search */}
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
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Fulfilled">Fulfilled</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Sales Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.contact}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Fulfilled' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-emerald-600 hover:text-emerald-900" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
