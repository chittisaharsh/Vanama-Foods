import { useState } from 'react';
import { TrendingUp, Target, Users, Plus, Search, Filter, Eye, Edit, Play, Pause } from 'lucide-react';
import MetricCard from '@/react-app/components/MetricCard';
import Chart from '@/react-app/components/Chart';

// Mock data for marketing
const campaigns = [
  { id: 1, name: 'Spring Harvest 2024', type: 'Email', status: 'Active', budget: '$5,000', spend: '$3,250', startDate: '2024-01-01', endDate: '2024-03-31', impressions: 125000, clicks: 3750, conversions: 186, roi: '285%' },
  { id: 2, name: 'Organic Awareness Drive', type: 'Social Media', status: 'Active', budget: '$8,500', spend: '$6,100', startDate: '2024-01-15', endDate: '2024-02-29', impressions: 89000, clicks: 2890, conversions: 142, roi: '198%' },
  { id: 3, name: 'Health Food Expo', type: 'Event', status: 'Completed', budget: '$12,000', spend: '$11,750', startDate: '2023-12-01', endDate: '2023-12-31', impressions: 45000, clicks: 1250, conversions: 89, roi: '156%' },
  { id: 4, name: 'Q1 Product Launch', type: 'PPC', status: 'Paused', budget: '$6,800', spend: '$2,450', startDate: '2024-01-08', endDate: '2024-04-08', impressions: 67000, clicks: 2100, conversions: 67, roi: '134%' },
  { id: 5, name: 'Customer Retention', type: 'Email', status: 'Draft', budget: '$3,200', spend: '$0', startDate: '2024-02-01', endDate: '2024-04-30', impressions: 0, clicks: 0, conversions: 0, roi: '0%' },
];

const marketingMetrics = [
  { name: 'Jan Week 1', leads: 145, conversions: 23, revenue: 12500 },
  { name: 'Jan Week 2', leads: 168, conversions: 28, revenue: 15800 },
  { name: 'Jan Week 3', leads: 192, conversions: 34, revenue: 18200 },
  { name: 'Jan Week 4', leads: 178, conversions: 31, revenue: 16900 },
];

const channelPerformance = [
  { name: 'Email', value: 35, conversions: 186 },
  { name: 'Social Media', value: 28, conversions: 142 },
  { name: 'PPC', value: 22, conversions: 67 },
  { name: 'Content', value: 15, conversions: 45 },
];

const leadSources = [
  { source: 'Organic Search', leads: 245, conversionRate: '12.5%', value: '$28,750' },
  { source: 'Email Campaigns', leads: 186, conversionRate: '18.2%', value: '$35,200' },
  { source: 'Social Media', leads: 142, conversionRate: '8.9%', value: '$19,800' },
  { source: 'Paid Search', leads: 89, conversionRate: '15.7%', value: '$22,100' },
  { source: 'Referrals', leads: 67, conversionRate: '22.1%', value: '$31,500' },
];

export default function Marketing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || campaign.status === filterStatus;
    const matchesType = filterType === 'All' || campaign.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalBudget = campaigns.reduce((sum, campaign) => {
    return sum + parseFloat(campaign.budget.replace('$', '').replace(',', ''));
  }, 0);

  const totalSpend = campaigns.reduce((sum, campaign) => {
    return sum + parseFloat(campaign.spend.replace('$', '').replace(',', ''));
  }, 0);

  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Management</h1>
          <p className="text-gray-600 mt-1">Track campaigns, analyze performance, and optimize marketing ROI</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Budget"
          value={`$${totalBudget.toLocaleString()}`}
          change="+15.3%"
          changeType="increase"
          icon={Target}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Total Spend"
          value={`$${totalSpend.toLocaleString()}`}
          change="+12.8%"
          changeType="increase"
          icon={TrendingUp}
          iconColor="text-green-600"
        />
        <MetricCard
          title="Total Conversions"
          value={totalConversions}
          change="+18.5%"
          changeType="increase"
          icon={Users}
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Average ROI"
          value="218%"
          change="+24.2%"
          changeType="increase"
          icon={TrendingUp}
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="line"
          data={marketingMetrics}
          dataKey="conversions"
          xKey="name"
          color="#10b981"
          title="Weekly Conversion Trends"
          height={300}
        />
        <Chart
          type="bar"
          data={channelPerformance}
          dataKey="conversions"
          xKey="name"
          color="#3b82f6"
          title="Channel Performance"
          height={300}
        />
      </div>

      {/* Lead Sources */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources Performance</h3>
        <div className="space-y-4">
          {leadSources.map((source, index) => (
            <div key={source.source} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{source.source}</p>
                  <p className="text-sm text-gray-500">{source.leads} leads • {source.conversionRate} conversion rate</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{source.value}</p>
                <p className="text-sm text-gray-500">Revenue generated</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search campaigns..."
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
                <option value="Paused">Paused</option>
                <option value="Completed">Completed</option>
                <option value="Draft">Draft</option>
              </select>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="All">All Types</option>
                <option value="Email">Email</option>
                <option value="Social Media">Social Media</option>
                <option value="PPC">PPC</option>
                <option value="Event">Event</option>
                <option value="Content">Content</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Marketing Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget/Spend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.startDate} - {campaign.endDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      campaign.type === 'Email' ? 'bg-blue-100 text-blue-800' :
                      campaign.type === 'Social Media' ? 'bg-purple-100 text-purple-800' :
                      campaign.type === 'PPC' ? 'bg-green-100 text-green-800' :
                      campaign.type === 'Event' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                      campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.spend} / {campaign.budget}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(parseFloat(campaign.spend.replace('$', '').replace(',', '')) / parseFloat(campaign.budget.replace('$', '').replace(',', ''))) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.conversions} conversions</div>
                    <div className="text-sm text-gray-500">{campaign.impressions.toLocaleString()} impressions</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600">{campaign.roi}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-emerald-600 hover:text-emerald-900" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      {campaign.status === 'Active' ? (
                        <button className="text-yellow-600 hover:text-yellow-900" title="Pause">
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : campaign.status === 'Paused' ? (
                        <button className="text-green-600 hover:text-green-900" title="Resume">
                          <Play className="h-4 w-4" />
                        </button>
                      ) : null}
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
