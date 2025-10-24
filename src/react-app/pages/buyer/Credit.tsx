import { CreditCard, TrendingUp, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import Chart from '@/react-app/components/Chart';

const creditInfo = {
  creditLimit: 150000,
  availableCredit: 105000,
  usedCredit: 45000,
  nextPaymentDue: '2024-01-15',
  nextPaymentAmount: 25000,
  interestRate: 1.5,
  paymentHistory: [
    { date: '2023-12-15', amount: 35000, status: 'Paid', method: 'Bank Transfer' },
    { date: '2023-11-15', amount: 28000, status: 'Paid', method: 'UPI' },
    { date: '2023-10-15', amount: 42000, status: 'Paid', method: 'Bank Transfer' },
    { date: '2023-09-15', amount: 31000, status: 'Paid', method: 'UPI' },
    { date: '2023-08-15', amount: 38000, status: 'Paid', method: 'Bank Transfer' }
  ]
};

const creditUtilization = [
  { name: 'Jan', utilized: 32, available: 68 },
  { name: 'Feb', utilized: 28, available: 72 },
  { name: 'Mar', utilized: 35, available: 65 },
  { name: 'Apr', utilized: 42, available: 58 },
  { name: 'May', utilized: 38, available: 62 },
  { name: 'Jun', utilized: 30, available: 70 }
];

const outstandingBreakdown = [
  { name: 'Current (0-30 days)', value: 25000, color: '#10b981' },
  { name: 'Past Due (31-60 days)', value: 15000, color: '#f59e0b' },
  { name: 'Overdue (60+ days)', value: 5000, color: '#ef4444' }
];

export default function Credit() {
  const utilizationPercent = (creditInfo.usedCredit / creditInfo.creditLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Credit Account</h1>
          <p className="text-gray-600 mt-1">Manage your Buy Now, Pay Later credit facility</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          Make Payment
        </button>
      </div>

      {/* Credit Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">Available Credit</p>
              <p className="text-3xl font-bold">₹{creditInfo.availableCredit.toLocaleString()}</p>
              <p className="text-emerald-100 text-sm mt-1">
                out of ₹{creditInfo.creditLimit.toLocaleString()}
              </p>
            </div>
            <CreditCard className="h-12 w-12 text-emerald-200" />
          </div>
          <div className="mt-4 bg-emerald-500 bg-opacity-30 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${(creditInfo.availableCredit / creditInfo.creditLimit) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Outstanding Balance</p>
              <p className="text-3xl font-bold text-gray-900">₹{creditInfo.usedCredit.toLocaleString()}</p>
              <p className="text-gray-500 text-sm mt-1">
                {utilizationPercent.toFixed(1)}% utilization
              </p>
            </div>
            <div className="text-right">
              <div className={`p-3 rounded-full ${utilizationPercent > 80 ? 'bg-red-100' : utilizationPercent > 60 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                <TrendingUp className={`h-6 w-6 ${utilizationPercent > 80 ? 'text-red-600' : utilizationPercent > 60 ? 'text-yellow-600' : 'text-green-600'}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Next Payment</p>
              <p className="text-2xl font-bold text-gray-900">₹{creditInfo.nextPaymentAmount.toLocaleString()}</p>
              <p className="text-gray-500 text-sm mt-1">Due {creditInfo.nextPaymentDue}</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Utilization Trend</h3>
          <Chart
            type="area"
            data={creditUtilization}
            dataKey="utilized"
            xKey="name"
            color="#10b981"
            height={250}
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Outstanding Breakdown</h3>
          <div className="space-y-4">
            {outstandingBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm font-medium text-yellow-800">Payment Reminder</p>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              You have ₹20,000 in past due amounts. Please make a payment to avoid late fees.
            </p>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
          <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {creditInfo.paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{payment.date}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">₹{payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{payment.method}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Terms */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Terms & Conditions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Interest Rate</h4>
            <p className="text-2xl font-bold text-emerald-600">{creditInfo.interestRate}%</p>
            <p className="text-sm text-gray-600">per month on outstanding balance</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Payment Terms</h4>
            <p className="text-sm text-gray-600">Monthly payments on the 15th of each month</p>
            <p className="text-sm text-gray-600">Grace period: 5 days</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Late Fee</h4>
            <p className="text-sm text-gray-600">₹500 or 2% of outstanding amount</p>
            <p className="text-sm text-gray-600">whichever is higher</p>
          </div>
        </div>
      </div>
    </div>
  );
}
