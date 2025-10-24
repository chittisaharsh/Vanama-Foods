import { useState } from 'react';
import { DollarSign, TrendingUp, Download, Filter, Eye } from 'lucide-react';
import Chart from '@/react-app/components/Chart';

const earningsData = [
  { name: 'Jan', commission: 18500, orders: 45, volume: 312000 },
  { name: 'Feb', commission: 22000, orders: 52, volume: 367000 },
  { name: 'Mar', commission: 19800, orders: 48, volume: 334000 },
  { name: 'Apr', commission: 25600, orders: 61, volume: 428000 },
  { name: 'May', commission: 28900, orders: 67, volume: 485000 },
  { name: 'Jun', commission: 32400, orders: 72, volume: 542000 },
];

const earningsHistory = [
  {
    id: 1,
    date: '2024-01-08',
    buyer: 'Kumar Grocery Store',
    orderValue: 11875,
    commissionRate: 8.5,
    commissionEarned: 1009,
    orderNumber: 'ORD-2024-101',
    status: 'Paid',
    paymentDate: '2024-01-10'
  },
  {
    id: 2,
    date: '2024-01-07',
    buyer: 'Sharma Wholesale',
    orderValue: 15600,
    commissionRate: 9.0,
    commissionEarned: 1404,
    orderNumber: 'ORD-2024-098',
    status: 'Paid',
    paymentDate: '2024-01-09'
  },
  {
    id: 3,
    date: '2024-01-06',
    buyer: 'Green Valley Store',
    orderValue: 8650,
    commissionRate: 8.0,
    commissionEarned: 692,
    orderNumber: 'ORD-2024-095',
    status: 'Paid',
    paymentDate: '2024-01-08'
  },
  {
    id: 4,
    date: '2024-01-05',
    buyer: 'City Mart',
    orderValue: 12300,
    commissionRate: 8.5,
    commissionEarned: 1046,
    orderNumber: 'ORD-2024-092',
    status: 'Pending',
    paymentDate: null
  },
  {
    id: 5,
    date: '2024-01-04',
    buyer: 'Metro Supplies',
    orderValue: 22500,
    commissionRate: 9.5,
    commissionEarned: 2138,
    orderNumber: 'ORD-2024-089',
    status: 'Paid',
    paymentDate: '2024-01-06'
  },
  {
    id: 6,
    date: '2024-01-03',
    buyer: 'Fresh Foods Hub',
    orderValue: 6750,
    commissionRate: 7.5,
    commissionEarned: 506,
    orderNumber: 'ORD-2024-086',
    status: 'Paid',
    paymentDate: '2024-01-05'
  },
  {
    id: 7,
    date: '2024-01-02',
    buyer: 'Kumar Grocery Store',
    orderValue: 9850,
    commissionRate: 8.5,
    commissionEarned: 837,
    orderNumber: 'ORD-2024-083',
    status: 'Paid',
    paymentDate: '2024-01-04'
  },
  {
    id: 8,
    date: '2024-01-01',
    buyer: 'Sharma Wholesale',
    orderValue: 18900,
    commissionRate: 9.0,
    commissionEarned: 1701,
    orderNumber: 'ORD-2024-080',
    status: 'Paid',
    paymentDate: '2024-01-03'
  }
];

const payoutHistory = [
  { date: '2024-01-01', amount: 28500, orders: 67, method: 'Bank Transfer', status: 'Completed' },
  { date: '2023-12-01', amount: 25600, orders: 61, method: 'Bank Transfer', status: 'Completed' },
  { date: '2023-11-01', amount: 22000, orders: 52, method: 'Bank Transfer', status: 'Completed' },
  { date: '2023-10-01', amount: 19800, orders: 48, method: 'Bank Transfer', status: 'Completed' },
];

export default function EarningsReport() {
  const [filterPeriod, setFilterPeriod] = useState('This Month');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedTransaction, setSelectedTransaction] = useState<typeof earningsHistory[0] | null>(null);

  const filteredEarnings = earningsHistory.filter(earning => {
    const matchesStatus = filterStatus === 'All' || earning.status === filterStatus;
    return matchesStatus;
  });

  const totalEarnings = filteredEarnings.reduce((sum, earning) => sum + earning.commissionEarned, 0);
  const paidEarnings = filteredEarnings.filter(e => e.status === 'Paid').reduce((sum, earning) => sum + earning.commissionEarned, 0);
  const pendingEarnings = filteredEarnings.filter(e => e.status === 'Pending').reduce((sum, earning) => sum + earning.commissionEarned, 0);
  const avgCommissionRate = filteredEarnings.reduce((sum, earning) => sum + earning.commissionRate, 0) / filteredEarnings.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Earnings Report</h1>
          <p className="text-gray-600 mt-1">Track your commission earnings and payouts</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Earnings</p>
              <p className="text-3xl font-bold">₹{totalEarnings.toLocaleString()}</p>
              <p className="text-purple-100 text-sm mt-1">This month</p>
            </div>
            <DollarSign className="h-12 w-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Paid Earnings</p>
              <p className="text-2xl font-bold text-green-600">₹{paidEarnings.toLocaleString()}</p>
              <p className="text-gray-500 text-sm mt-1">{filteredEarnings.filter(e => e.status === 'Paid').length} transactions</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Earnings</p>
              <p className="text-2xl font-bold text-orange-600">₹{pendingEarnings.toLocaleString()}</p>
              <p className="text-gray-500 text-sm mt-1">{filteredEarnings.filter(e => e.status === 'Pending').length} transactions</p>
            </div>
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-orange-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Commission Rate</p>
              <p className="text-2xl font-bold text-blue-600">{avgCommissionRate.toFixed(1)}%</p>
              <p className="text-gray-500 text-sm mt-1">Across all orders</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Earnings Trend</h3>
          <Chart
            type="area"
            data={earningsData}
            dataKey="commission"
            xKey="name"
            color="#9333ea"
            height={250}
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payout History</h3>
          <div className="space-y-4">
            {payoutHistory.map((payout, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{payout.date}</p>
                  <p className="text-sm text-gray-600">{payout.orders} orders • {payout.method}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">₹{payout.amount.toLocaleString()}</p>
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {payout.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">Commission Transactions</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="This Year">This Year</option>
              </select>
            </div>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Earned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEarnings.map((earning) => (
                <tr key={earning.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{earning.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{earning.buyer}</div>
                      <div className="text-sm text-gray-500">{earning.orderNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{earning.orderValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {earning.commissionRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">
                    ₹{earning.commissionEarned.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      earning.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {earning.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {earning.paymentDate || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => setSelectedTransaction(earning)}
                      className="text-purple-600 hover:text-purple-900 flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Commission Transaction Details</h2>
                <button 
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Transaction Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Order Number</p>
                      <p className="font-medium">{selectedTransaction.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">{selectedTransaction.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Buyer</p>
                      <p className="font-medium">{selectedTransaction.buyer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedTransaction.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {selectedTransaction.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Commission Breakdown</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Order Value</span>
                      <span>₹{selectedTransaction.orderValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Commission Rate</span>
                      <span>{selectedTransaction.commissionRate}%</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                      <span>Commission Earned</span>
                      <span className="text-emerald-600">₹{selectedTransaction.commissionEarned.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedTransaction.paymentDate && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Payment Information</h3>
                  <p className="text-gray-600">Paid on: {selectedTransaction.paymentDate}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Receipt
                </button>
                {selectedTransaction.status === 'Pending' && (
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Follow Up Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredEarnings.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No earnings found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
