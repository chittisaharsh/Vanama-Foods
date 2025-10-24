import { useState } from 'react';
import { Users, Mail, Phone, Building, Plus, Search, Filter } from 'lucide-react';
import MetricCard from '@/react-app/components/MetricCard';

// Mock data for CRM
const customers = [
  { id: 1, name: 'Whole Foods Market', contact: 'Sarah Johnson', email: 'sarah@wholefoods.com', phone: '+1 (555) 123-4567', type: 'Retail Chain', status: 'Active', lastOrder: '2024-01-08', value: '$45,200' },
  { id: 2, name: 'Green Valley Co-op', contact: 'Mike Chen', email: 'mike@greenvalley.com', phone: '+1 (555) 234-5678', type: 'Cooperative', status: 'Active', lastOrder: '2024-01-06', value: '$28,750' },
  { id: 3, name: 'Organic Market Plus', contact: 'Lisa Rodriguez', email: 'lisa@organicplus.com', phone: '+1 (555) 345-6789', type: 'Specialty Store', status: 'Active', lastOrder: '2024-01-05', value: '$32,100' },
  { id: 4, name: 'Fresh & Natural Foods', contact: 'David Park', email: 'david@freshnatural.com', phone: '+1 (555) 456-7890', type: 'Grocery Chain', status: 'Pending', lastOrder: '2024-01-03', value: '$19,800' },
  { id: 5, name: 'Earth Friendly Grocers', contact: 'Emily White', email: 'emily@earthfriendly.com', phone: '+1 (555) 567-8901', type: 'Specialty Store', status: 'Active', lastOrder: '2024-01-07', value: '$38,900' },
];

const recentInteractions = [
  { id: 1, customer: 'Whole Foods Market', type: 'Call', subject: 'Q2 Order Planning', date: '2024-01-08', status: 'Completed' },
  { id: 2, customer: 'Green Valley Co-op', type: 'Email', subject: 'New Product Catalog', date: '2024-01-07', status: 'Sent' },
  { id: 3, customer: 'Organic Market Plus', type: 'Meeting', subject: 'Partnership Expansion', date: '2024-01-06', status: 'Scheduled' },
];

export default function CRM() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Relationship Management</h1>
          <p className="text-gray-600 mt-1">Manage customer relationships and track interactions</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Customers"
          value="1,429"
          change="+12%"
          changeType="increase"
          icon={Users}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Active Accounts"
          value="1,286"
          change="+8%"
          changeType="increase"
          icon={Building}
          iconColor="text-green-600"
        />
        <MetricCard
          title="This Month Contacts"
          value="248"
          change="+15%"
          changeType="increase"
          icon={Phone}
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Email Response Rate"
          value="68%"
          change="+5%"
          changeType="increase"
          icon={Mail}
          iconColor="text-orange-600"
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
                placeholder="Search customers..."
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
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Customer Directory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{customer.contact}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{customer.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                      customer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.lastOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-emerald-600 hover:text-emerald-900">Edit</button>
                      <button className="text-blue-600 hover:text-blue-900">Contact</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Interactions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Interactions</h3>
        <div className="space-y-4">
          {recentInteractions.map((interaction) => (
            <div key={interaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  interaction.type === 'Call' ? 'bg-blue-100' :
                  interaction.type === 'Email' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  {interaction.type === 'Call' && <Phone className="h-4 w-4 text-blue-600" />}
                  {interaction.type === 'Email' && <Mail className="h-4 w-4 text-green-600" />}
                  {interaction.type === 'Meeting' && <Users className="h-4 w-4 text-purple-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{interaction.subject}</p>
                  <p className="text-sm text-gray-500">{interaction.customer} • {interaction.date}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                interaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                interaction.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {interaction.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
