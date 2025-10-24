import { useState } from 'react';
import { Search, Filter, Users, TrendingUp, Calendar, Phone, Mail, MapPin, DollarSign } from 'lucide-react';

const buyers = [
  {
    id: 1,
    companyName: 'Kumar Grocery Store',
    contactPerson: 'Rajesh Kumar',
    email: 'rajesh@kumargrocery.com',
    phone: '+91 98765 43210',
    address: 'Shop 15, Main Market, Delhi',
    joinedDate: '2023-08-15',
    status: 'Active',
    businessType: 'Retail',
    monthlyVolume: 145000,
    totalOrders: 48,
    lastOrderDate: '2024-01-08',
    commissionEarned: 23400,
    creditLimit: 150000,
    outstandingAmount: 35000,
    averageOrderValue: 12500,
    rating: 4.8
  },
  {
    id: 2,
    companyName: 'Sharma Wholesale',
    contactPerson: 'Priya Sharma',
    email: 'priya@sharmawholesale.com',
    phone: '+91 87654 32109',
    address: 'Warehouse 8, Industrial Area, Gurgaon',
    joinedDate: '2023-06-20',
    status: 'Active',
    businessType: 'Wholesale',
    monthlyVolume: 98000,
    totalOrders: 32,
    lastOrderDate: '2024-01-07',
    commissionEarned: 18200,
    creditLimit: 200000,
    outstandingAmount: 45000,
    averageOrderValue: 18000,
    rating: 4.6
  },
  {
    id: 3,
    companyName: 'Green Valley Store',
    contactPerson: 'Amit Patel',
    email: 'amit@greenvalley.com',
    phone: '+91 76543 21098',
    address: '23, Green Valley, Pune',
    joinedDate: '2023-09-10',
    status: 'Active',
    businessType: 'Retail',
    monthlyVolume: 76000,
    totalOrders: 28,
    lastOrderDate: '2024-01-06',
    commissionEarned: 14800,
    creditLimit: 100000,
    outstandingAmount: 22000,
    averageOrderValue: 9500,
    rating: 4.9
  },
  {
    id: 4,
    companyName: 'City Mart',
    contactPerson: 'Suresh Reddy',
    email: 'suresh@citymart.com',
    phone: '+91 65432 10987',
    address: 'Plot 45, City Center, Hyderabad',
    joinedDate: '2023-11-05',
    status: 'Active',
    businessType: 'Retail',
    monthlyVolume: 54000,
    totalOrders: 22,
    lastOrderDate: '2024-01-05',
    commissionEarned: 9800,
    creditLimit: 80000,
    outstandingAmount: 18000,
    averageOrderValue: 8200,
    rating: 4.4
  },
  {
    id: 5,
    companyName: 'Fresh Foods Hub',
    contactPerson: 'Neha Singh',
    email: 'neha@freshfoodshub.com',
    phone: '+91 54321 09876',
    address: '45, Market Street, Jaipur',
    joinedDate: '2023-12-12',
    status: 'Inactive',
    businessType: 'HoReCa',
    monthlyVolume: 0,
    totalOrders: 8,
    lastOrderDate: '2023-12-28',
    commissionEarned: 3200,
    creditLimit: 60000,
    outstandingAmount: 12000,
    averageOrderValue: 6500,
    rating: 4.2
  },
  {
    id: 6,
    companyName: 'Metro Supplies',
    contactPerson: 'Vikram Joshi',
    email: 'vikram@metrosupplies.com',
    phone: '+91 43210 98765',
    address: 'Building 12, Business Park, Bangalore',
    joinedDate: '2024-01-03',
    status: 'Active',
    businessType: 'Wholesale',
    monthlyVolume: 32000,
    totalOrders: 6,
    lastOrderDate: '2024-01-07',
    commissionEarned: 1800,
    creditLimit: 120000,
    outstandingAmount: 8000,
    averageOrderValue: 15000,
    rating: 4.7
  }
];

export default function MyBuyers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterBusinessType, setFilterBusinessType] = useState('All');
  const [selectedBuyer, setSelectedBuyer] = useState<typeof buyers[0] | null>(null);

  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch = buyer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || buyer.status === filterStatus;
    const matchesBusinessType = filterBusinessType === 'All' || buyer.businessType === filterBusinessType;
    return matchesSearch && matchesStatus && matchesBusinessType;
  });

  const totalBuyers = buyers.length;
  const activeBuyers = buyers.filter(b => b.status === 'Active').length;
  const totalCommission = buyers.reduce((sum, buyer) => sum + buyer.commissionEarned, 0);
  const totalVolume = buyers.reduce((sum, buyer) => sum + buyer.monthlyVolume, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Buyers</h1>
          <p className="text-gray-600 mt-1">Manage and track your onboarded buyers</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Onboard New Buyer
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Buyers</p>
              <p className="text-2xl font-bold text-gray-900">{totalBuyers}</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Buyers</p>
              <p className="text-2xl font-bold text-green-600">{activeBuyers}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Commission</p>
              <p className="text-2xl font-bold text-emerald-600">₹{(totalCommission / 1000).toFixed(0)}K</p>
            </div>
            <DollarSign className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Volume</p>
              <p className="text-2xl font-bold text-blue-600">₹{(totalVolume / 1000).toFixed(0)}K</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search buyers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <select 
              value={filterBusinessType}
              onChange={(e) => setFilterBusinessType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="All">All Business Types</option>
              <option value="Retail">Retail</option>
              <option value="Wholesale">Wholesale</option>
              <option value="HoReCa">HoReCa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buyers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBuyers.map((buyer) => (
          <div key={buyer.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{buyer.companyName}</h3>
                <p className="text-sm text-gray-600">{buyer.contactPerson}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  buyer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {buyer.status}
                </span>
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                  {buyer.businessType}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{buyer.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{buyer.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{buyer.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Joined: {buyer.joinedDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-600">Monthly Volume</p>
                <p className="font-semibold text-gray-900">₹{(buyer.monthlyVolume / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Commission Earned</p>
                <p className="font-semibold text-emerald-600">₹{buyer.commissionEarned.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Orders</p>
                <p className="font-semibold text-gray-900">{buyer.totalOrders}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Avg Order Value</p>
                <p className="font-semibold text-gray-900">₹{(buyer.averageOrderValue / 1000).toFixed(0)}K</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Last Order: {buyer.lastOrderDate}
              </div>
              <button 
                onClick={() => setSelectedBuyer(buyer)}
                className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Buyer Details Modal */}
      {selectedBuyer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedBuyer.companyName}</h2>
                  <p className="text-gray-600">Buyer Profile & Performance</p>
                </div>
                <button 
                  onClick={() => setSelectedBuyer(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Contact Person</p>
                    <p className="font-medium">{selectedBuyer.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Business Type</p>
                    <p className="font-medium">{selectedBuyer.businessType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedBuyer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedBuyer.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{selectedBuyer.address}</p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <p className="text-sm font-medium text-blue-900">Monthly Volume</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">₹{(selectedBuyer.monthlyVolume / 1000).toFixed(0)}K</p>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-5 w-5 text-emerald-600" />
                      <p className="text-sm font-medium text-emerald-900">Commission Earned</p>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600">₹{selectedBuyer.commissionEarned.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <p className="text-sm font-medium text-purple-900">Total Orders</p>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{selectedBuyer.totalOrders}</p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Credit Limit</p>
                    <p className="font-medium text-lg">₹{selectedBuyer.creditLimit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Outstanding Amount</p>
                    <p className="font-medium text-lg text-orange-600">₹{selectedBuyer.outstandingAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Credit</p>
                    <p className="font-medium text-lg text-green-600">
                      ₹{(selectedBuyer.creditLimit - selectedBuyer.outstandingAmount).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Joined Date</p>
                  <p className="font-medium">{selectedBuyer.joinedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Order Date</p>
                  <p className="font-medium">{selectedBuyer.lastOrderDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Order Value</p>
                  <p className="font-medium">₹{selectedBuyer.averageOrderValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer Rating</p>
                  <p className="font-medium">{selectedBuyer.rating}/5.0</p>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Orders History
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Contact Buyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredBuyers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No buyers found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}
