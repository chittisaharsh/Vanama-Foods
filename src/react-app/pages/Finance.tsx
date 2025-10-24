import { useState } from 'react';
import { DollarSign, FileText, CreditCard, TrendingUp, Plus, Search, Filter, Download } from 'lucide-react';
import MetricCard from '@/react-app/components/MetricCard';
import Chart from '@/react-app/components/Chart';

// Mock data for finance
const invoices = [
  { id: 1, number: 'INV-2024-001', customer: 'Whole Foods Market', date: '2024-01-08', dueDate: '2024-02-07', amount: '$8,750', status: 'Paid' },
  { id: 2, number: 'INV-2024-002', customer: 'Green Valley Co-op', date: '2024-01-07', dueDate: '2024-02-06', amount: '$5,200', status: 'Pending' },
  { id: 3, number: 'INV-2024-003', customer: 'Organic Market Plus', date: '2024-01-06', dueDate: '2024-02-05', amount: '$12,300', status: 'Overdue' },
  { id: 4, number: 'INV-2024-004', customer: 'Fresh & Natural Foods', date: '2024-01-05', dueDate: '2024-02-04', amount: '$3,450', status: 'Draft' },
  { id: 5, number: 'INV-2024-005', customer: 'Earth Friendly Grocers', date: '2024-01-04', dueDate: '2024-02-03', amount: '$9,850', status: 'Paid' },
];

const cashFlow = [
  { name: 'Jul', inflow: 385000, outflow: 290000 },
  { name: 'Aug', inflow: 412000, outflow: 320000 },
  { name: 'Sep', inflow: 398000, outflow: 315000 },
  { name: 'Oct', inflow: 445000, outflow: 340000 },
  { name: 'Nov', inflow: 478000, outflow: 365000 },
  { name: 'Dec', inflow: 510000, outflow: 385000 },
  { name: 'Jan', inflow: 525000, outflow: 395000 },
];

const expenseCategories = [
  { name: 'Cost of Goods Sold', value: 165000 },
  { name: 'Salaries & Benefits', value: 89000 },
  { name: 'Marketing', value: 42000 },
  { name: 'Operations', value: 38000 },
  { name: 'Administrative', value: 25000 },
  { name: 'Other', value: 16000 },
];

const recentTransactions = [
  { id: 1, type: 'Income', description: 'Payment from Whole Foods Market', amount: '$8,750', date: '2024-01-08', category: 'Sales Revenue' },
  { id: 2, type: 'Expense', description: 'Supplier payment - Organic Farms Co.', amount: '$12,500', date: '2024-01-08', category: 'Cost of Goods' },
  { id: 3, type: 'Income', description: 'Payment from Earth Friendly Grocers', amount: '$9,850', date: '2024-01-07', category: 'Sales Revenue' },
  { id: 4, type: 'Expense', description: 'Monthly rent payment', amount: '$4,200', date: '2024-01-07', category: 'Operations' },
  { id: 5, type: 'Expense', description: 'Marketing campaign - Google Ads', amount: '$1,850', date: '2024-01-06', category: 'Marketing' },
];

export default function Finance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalReceivables = invoices
    .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0);

  const overdueAmount = invoices
    .filter(inv => inv.status === 'Overdue')
    .reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
          <p className="text-gray-600 mt-1">Track invoices, cash flow, and financial performance</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$525,000"
          change="+12.8%"
          changeType="increase"
          icon={TrendingUp}
          iconColor="text-green-600"
        />
        <MetricCard
          title="Accounts Receivable"
          value={`$${totalReceivables.toLocaleString()}`}
          change="-8.5%"
          changeType="decrease"
          icon={DollarSign}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Overdue Invoices"
          value={`$${overdueAmount.toLocaleString()}`}
          change="+15.2%"
          changeType="increase"
          icon={FileText}
          iconColor="text-red-600"
        />
        <MetricCard
          title="Net Profit Margin"
          value="24.8%"
          change="+2.3%"
          changeType="increase"
          icon={TrendingUp}
          iconColor="text-purple-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Trend</h3>
          <Chart
            type="area"
            data={cashFlow}
            dataKey="inflow"
            xKey="name"
            color="#10b981"
            height={250}
          />
        </div>
        <Chart
          type="pie"
          data={expenseCategories}
          dataKey="value"
          title="Expense Breakdown"
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
                placeholder="Search invoices..."
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
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-emerald-600 hover:text-emerald-900">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'Income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'Income' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <CreditCard className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${
                transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'Income' ? '+' : '-'}{transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
