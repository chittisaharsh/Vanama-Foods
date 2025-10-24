import { Users, Package, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, Eye, Settings } from 'lucide-react';
import MetricCard from '@/react-app/components/MetricCard';
import Chart from '@/react-app/components/Chart';

const platformData = [
  { name: 'Jan', gmv: 2850000, orders: 342, users: 89 },
  { name: 'Feb', gmv: 3120000, orders: 398, users: 102 },
  { name: 'Mar', gmv: 2980000, orders: 356, users: 115 },
  { name: 'Apr', gmv: 3450000, orders: 421, users: 128 },
  { name: 'May', gmv: 3780000, orders: 468, users: 134 },
  { name: 'Jun', gmv: 4100000, orders: 512, users: 147 },
];

const userGrowth = [
  { name: 'Buyers', value: 89, growth: '+12%' },
  { name: 'Sellers', value: 23, growth: '+8%' },
  { name: 'Brokers', value: 15, growth: '+25%' },
];

const topPerformers = {
  sellers: [
    { name: 'Suresh Rice Mills', revenue: 285000, orders: 89 },
    { name: 'Green Valley Mills', revenue: 198000, orders: 67 },
    { name: 'North India Mills', revenue: 156000, orders: 52 },
  ],
  buyers: [
    { name: 'Kumar Grocery Store', volume: 145000, orders: 48 },
    { name: 'Sharma Wholesale', volume: 98000, orders: 32 },
    { name: 'City Mart', volume: 76000, orders: 28 },
  ],
  brokers: [
    { name: 'Priya Sharma', commission: 32400, buyers: 12 },
    { name: 'Rajesh Kumar', commission: 28900, buyers: 9 },
    { name: 'Amit Patel', commission: 22100, buyers: 8 },
  ]
};

const recentActivity = [
  { id: 1, type: 'order', message: 'Large order placed by Kumar Grocery Store', amount: 25000, time: '5 min ago', priority: 'high' },
  { id: 2, type: 'user', message: 'New seller onboarded: South Mills Co.', amount: 0, time: '15 min ago', priority: 'medium' },
  { id: 3, type: 'payment', message: 'Payment dispute raised by Green Valley Store', amount: 8500, time: '32 min ago', priority: 'high' },
  { id: 4, type: 'product', message: 'Low stock alert: Premium Basmati Rice', amount: 0, time: '1 hour ago', priority: 'medium' },
  { id: 5, type: 'commission', message: 'Monthly commissions paid to 15 brokers', amount: 186000, time: '2 hours ago', priority: 'low' },
];

const systemAlerts = [
  { id: 1, type: 'critical', message: 'Payment gateway experiencing delays', time: '10 min ago' },
  { id: 2, type: 'warning', message: '3 products require quality verification', time: '45 min ago' },
  { id: 3, type: 'info', message: 'Monthly compliance report due in 2 days', time: '3 hours ago' },
];

export default function AdminDashboard() {
  const totalGMV = 23280000;
  const totalUsers = 147;
  const totalOrders = 2497;
  const activeDisputes = 3;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Overview</h1>
          <p className="text-gray-600 mt-1">Monitor and manage the Vanama Foods marketplace</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Analytics</span>
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Platform Settings</span>
          </button>
        </div>
      </div>

      {/* System Alerts */}
      {systemAlerts.length > 0 && (
        <div className="bg-white border border-orange-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-orange-900">System Alerts</h3>
          </div>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg ${
                alert.type === 'critical' ? 'bg-red-50 border border-red-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.type === 'critical' ? 'bg-red-500' :
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                </div>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total GMV"
          value={`₹${(totalGMV / 1000000).toFixed(1)}M`}
          change="+18.5%"
          changeType="increase"
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <MetricCard
          title="Total Users"
          value={totalUsers}
          change="+15 this month"
          changeType="increase"
          icon={Users}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Total Orders"
          value={totalOrders}
          change="+12.3%"
          changeType="increase"
          icon={ShoppingCart}
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Active Disputes"
          value={activeDisputes}
          change="-2 resolved"
          changeType="decrease"
          icon={AlertTriangle}
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform GMV Trend</h3>
          <Chart
            type="area"
            data={platformData}
            dataKey="gmv"
            xKey="name"
            color="#10b981"
            height={250}
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="space-y-4">
            {userGrowth.map((segment) => (
              <div key={segment.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{segment.name}</p>
                  <p className="text-sm text-gray-600">{segment.value} active users</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">{segment.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2 text-blue-600" />
            Top Sellers
          </h3>
          <div className="space-y-3">
            {topPerformers.sellers.map((seller, index) => (
              <div key={seller.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{seller.name}</p>
                    <p className="text-xs text-gray-600">{seller.orders} orders</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">₹{(seller.revenue / 1000).toFixed(0)}K</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-emerald-600" />
            Top Buyers
          </h3>
          <div className="space-y-3">
            {topPerformers.buyers.map((buyer, index) => (
              <div key={buyer.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{buyer.name}</p>
                    <p className="text-xs text-gray-600">{buyer.orders} orders</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">₹{(buyer.volume / 1000).toFixed(0)}K</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
            Top Brokers
          </h3>
          <div className="space-y-3">
            {topPerformers.brokers.map((broker, index) => (
              <div key={broker.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{broker.name}</p>
                    <p className="text-xs text-gray-600">{broker.buyers} buyers</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">₹{(broker.commission / 1000).toFixed(0)}K</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Platform Activity</h3>
          <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
            View All Activity
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0">
                {activity.type === 'order' && <ShoppingCart className="h-4 w-4 text-blue-600 mt-0.5" />}
                {activity.type === 'user' && <Users className="h-4 w-4 text-green-600 mt-0.5" />}
                {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-orange-600 mt-0.5" />}
                {activity.type === 'product' && <Package className="h-4 w-4 text-purple-600 mt-0.5" />}
                {activity.type === 'commission' && <TrendingUp className="h-4 w-4 text-emerald-600 mt-0.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {activity.amount > 0 && (
                      <span className="text-sm font-medium text-gray-900">₹{activity.amount.toLocaleString()}</span>
                    )}
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                      activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
