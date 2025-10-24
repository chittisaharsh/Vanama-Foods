import MetricCard from "@/react-app/components/MetricCard";
import Chart from "@/react-app/components/Chart";
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Package,
  Activity
} from "lucide-react";

// Mock data for charts
const revenueData = [
  { name: 'Jan', value: 85000 },
  { name: 'Feb', value: 92000 },
  { name: 'Mar', value: 88000 },
  { name: 'Apr', value: 95000 },
  { name: 'May', value: 102000 },
  { name: 'Jun', value: 108000 },
];

const salesData = [
  { name: 'Q1', value: 275000 },
  { name: 'Q2', value: 310000 },
  { name: 'Q3', value: 295000 },
  { name: 'Q4', value: 340000 },
];

const topProducts = [
  { name: 'Organic Rice', value: 35 },
  { name: 'Quinoa', value: 28 },
  { name: 'Chia Seeds', value: 22 },
  { name: 'Coconut Oil', value: 15 },
];

const recentActivity = [
  { id: 1, type: 'order', message: 'New order #SO-2024-001 from Whole Foods Market', time: '5 minutes ago' },
  { id: 2, type: 'payment', message: 'Payment received for invoice #INV-2024-089', time: '12 minutes ago' },
  { id: 3, type: 'customer', message: 'New customer registration: Green Valley Co-op', time: '1 hour ago' },
  { id: 4, type: 'inventory', message: 'Low stock alert: Organic Quinoa (15 units remaining)', time: '2 hours ago' },
  { id: 5, type: 'campaign', message: 'Email campaign "Spring Harvest" achieved 24% open rate', time: '3 hours ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$108,000"
          change="+12.5%"
          changeType="increase"
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <MetricCard
          title="Orders This Month"
          value="247"
          change="+8.2%"
          changeType="increase"
          icon={ShoppingCart}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Active Customers"
          value="1,429"
          change="+15.3%"
          changeType="increase"
          icon={Users}
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          change="-0.5%"
          changeType="decrease"
          icon={TrendingUp}
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="area"
          data={revenueData}
          dataKey="value"
          xKey="name"
          color="#10b981"
          title="Monthly Revenue Trend"
          height={300}
        />
        <Chart
          type="bar"
          data={salesData}
          dataKey="value"
          xKey="name"
          color="#3b82f6"
          title="Quarterly Sales Performance"
          height={300}
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2 text-emerald-600" />
            Top Products This Month
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{product.name}</span>
                </div>
                <span className="text-sm text-gray-600">{product.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-emerald-600" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-shrink-0">
                  {activity.type === 'order' && <ShoppingCart className="h-4 w-4 text-blue-600 mt-0.5" />}
                  {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-green-600 mt-0.5" />}
                  {activity.type === 'customer' && <Users className="h-4 w-4 text-purple-600 mt-0.5" />}
                  {activity.type === 'inventory' && <Package className="h-4 w-4 text-orange-600 mt-0.5" />}
                  {activity.type === 'campaign' && <TrendingUp className="h-4 w-4 text-pink-600 mt-0.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
