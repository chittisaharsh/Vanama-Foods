import { Users, DollarSign, TrendingUp, Award, UserPlus, Calendar } from 'lucide-react';
import MetricCard from '@/react-app/components/MetricCard';
import Chart from '@/react-app/components/Chart';

const commissionData = [
  { name: 'Jan', earnings: 18500 },
  { name: 'Feb', earnings: 22000 },
  { name: 'Mar', earnings: 19800 },
  { name: 'Apr', earnings: 25600 },
  { name: 'May', earnings: 28900 },
  { name: 'Jun', earnings: 32400 },
];

const topBuyers = [
  { name: 'Kumar Grocery Store', monthlyVolume: 145000, commission: 8500, growth: '+15%' },
  { name: 'Sharma Wholesale', monthlyVolume: 98000, commission: 6200, growth: '+8%' },
  { name: 'Green Valley Store', monthlyVolume: 76000, commission: 4800, growth: '+22%' },
  { name: 'City Mart', monthlyVolume: 54000, commission: 3400, growth: '+5%' },
];

const recentActivity = [
  { id: 1, type: 'signup', buyer: 'Fresh Market Plaza', amount: 0, time: '2 hours ago', status: 'Onboarded' },
  { id: 2, type: 'commission', buyer: 'Kumar Grocery Store', amount: 2800, time: '4 hours ago', status: 'Earned' },
  { id: 3, type: 'order', buyer: 'Sharma Wholesale', amount: 15000, time: '6 hours ago', status: 'Order Placed' },
  { id: 4, type: 'payout', buyer: 'Monthly Commission', amount: 28500, time: '2 days ago', status: 'Paid' },
];

const monthlyTargets = {
  buyersTarget: 15,
  buyersAchieved: 12,
  commissionTarget: 35000,
  commissionAchieved: 32400,
  volumeTarget: 500000,
  volumeAchieved: 448000
};

export default function BrokerDashboard() {
  const totalBuyers = 47;
  const activeBuyers = 42;
  const totalCommission = 156800;
  const monthlyCommission = 32400;
  const avgOrderValue = 12500;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Broker Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your performance and commission earnings</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Onboard New Buyer
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Buyers"
          value={totalBuyers}
          change="+3 this month"
          changeType="increase"
          icon={Users}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="This Month Commission"
          value={`₹${(monthlyCommission / 1000).toFixed(0)}K`}
          change="+18.5%"
          changeType="increase"
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <MetricCard
          title="Total Earnings"
          value={`₹${(totalCommission / 1000).toFixed(0)}K`}
          change="+25.3%"
          changeType="increase"
          icon={TrendingUp}
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Avg Order Value"
          value={`₹${(avgOrderValue / 1000).toFixed(0)}K`}
          change="+8.2%"
          changeType="increase"
          icon={Award}
          iconColor="text-orange-600"
        />
      </div>

      {/* Monthly Targets */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Monthly Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-purple-100 text-sm">New Buyers Target</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 bg-purple-500 bg-opacity-30 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(monthlyTargets.buyersAchieved / monthlyTargets.buyersTarget) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{monthlyTargets.buyersAchieved}/{monthlyTargets.buyersTarget}</span>
            </div>
          </div>
          <div>
            <p className="text-purple-100 text-sm">Commission Target</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 bg-purple-500 bg-opacity-30 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(monthlyTargets.commissionAchieved / monthlyTargets.commissionTarget) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">₹{(monthlyTargets.commissionAchieved / 1000).toFixed(0)}K</span>
            </div>
          </div>
          <div>
            <p className="text-purple-100 text-sm">Volume Target</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 bg-purple-500 bg-opacity-30 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(monthlyTargets.volumeAchieved / monthlyTargets.volumeTarget) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">₹{(monthlyTargets.volumeAchieved / 1000).toFixed(0)}K</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Earnings (Last 6 Months)</h3>
          <Chart
            type="area"
            data={commissionData}
            dataKey="earnings"
            xKey="name"
            color="#9333ea"
            height={250}
          />
        </div>

        {/* Top Performing Buyers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-purple-600" />
            Top Performing Buyers
          </h3>
          <div className="space-y-4">
            {topBuyers.map((buyer, index) => (
              <div key={buyer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{buyer.name}</p>
                    <p className="text-sm text-gray-600">₹{(buyer.monthlyVolume / 1000).toFixed(0)}K monthly volume</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">₹{buyer.commission.toLocaleString()}</p>
                  <p className="text-sm text-green-600">{buyer.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-600" />
            Recent Activity
          </h3>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0">
                {activity.type === 'signup' && <UserPlus className="h-4 w-4 text-blue-600 mt-0.5" />}
                {activity.type === 'commission' && <DollarSign className="h-4 w-4 text-green-600 mt-0.5" />}
                {activity.type === 'order' && <TrendingUp className="h-4 w-4 text-purple-600 mt-0.5" />}
                {activity.type === 'payout' && <Award className="h-4 w-4 text-orange-600 mt-0.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-900">
                      {activity.type === 'signup' && `New buyer onboarded: ${activity.buyer}`}
                      {activity.type === 'commission' && `Commission earned from ${activity.buyer}`}
                      {activity.type === 'order' && `Order placed by ${activity.buyer}`}
                      {activity.type === 'payout' && `Commission payout processed`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {activity.amount > 0 && (
                      <span className="text-sm font-medium text-gray-900">₹{activity.amount.toLocaleString()}</span>
                    )}
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      activity.status === 'Onboarded' ? 'bg-blue-100 text-blue-800' :
                      activity.status === 'Earned' ? 'bg-green-100 text-green-800' :
                      activity.status === 'Order Placed' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {activity.status}
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
