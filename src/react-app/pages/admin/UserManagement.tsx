import { useState } from 'react';
import { Search, Filter, Users, Eye, Edit, Ban, CheckCircle, UserPlus, Building, Factory, Handshake } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@kumargrocery.com',
    role: 'buyer',
    company: 'Kumar Grocery Store',
    phone: '+91 98765 43210',
    location: 'Delhi',
    joinedDate: '2023-08-15',
    status: 'Active',
    lastLogin: '2024-01-08',
    totalOrders: 48,
    totalVolume: 345000,
    creditLimit: 150000,
    outstandingAmount: 35000,
    broker: 'Priya Sharma'
  },
  {
    id: 2,
    name: 'Suresh Mill Owner',
    email: 'suresh@sureshricemills.com',
    role: 'seller',
    company: 'Suresh Rice Mills',
    phone: '+91 87654 32109',
    location: 'Punjab',
    joinedDate: '2023-06-20',
    status: 'Active',
    lastLogin: '2024-01-08',
    totalOrders: 156,
    totalVolume: 806000,
    products: 12,
    rating: 4.7
  },
  {
    id: 3,
    name: 'Priya Sharma',
    email: 'priya@sharmasales.com',
    role: 'broker',
    company: 'Sharma Sales Agency',
    phone: '+91 76543 21098',
    location: 'Mumbai',
    joinedDate: '2023-09-10',
    status: 'Active',
    lastLogin: '2024-01-07',
    totalBuyers: 12,
    commissionEarned: 156800,
    monthlyCommission: 32400
  },
  {
    id: 4,
    name: 'Amit Patel',
    email: 'amit@greenvalley.com',
    role: 'buyer',
    company: 'Green Valley Store',
    phone: '+91 65432 10987',
    location: 'Pune',
    joinedDate: '2023-11-05',
    status: 'Active',
    lastLogin: '2024-01-06',
    totalOrders: 28,
    totalVolume: 186000,
    creditLimit: 100000,
    outstandingAmount: 22000,
    broker: 'Rajesh Kumar'
  },
  {
    id: 5,
    name: 'Neha Singh',
    email: 'neha@freshfoodshub.com',
    role: 'buyer',
    company: 'Fresh Foods Hub',
    phone: '+91 54321 09876',
    location: 'Jaipur',
    joinedDate: '2023-12-12',
    status: 'Inactive',
    lastLogin: '2023-12-28',
    totalOrders: 8,
    totalVolume: 45000,
    creditLimit: 60000,
    outstandingAmount: 12000,
    broker: 'Priya Sharma'
  },
  {
    id: 6,
    name: 'Green Valley Mills',
    email: 'info@greenvalleymills.com',
    role: 'seller',
    company: 'Green Valley Mills',
    phone: '+91 43210 98765',
    location: 'Karnataka',
    joinedDate: '2023-07-15',
    status: 'Active',
    lastLogin: '2024-01-07',
    totalOrders: 89,
    totalVolume: 456000,
    products: 8,
    rating: 4.6
  },
  {
    id: 7,
    name: 'Vikram Joshi',
    email: 'vikram@joshiagency.com',
    role: 'broker',
    company: 'Joshi Sales Agency',
    phone: '+91 32109 87654',
    location: 'Bangalore',
    joinedDate: '2024-01-03',
    status: 'Active',
    lastLogin: '2024-01-08',
    totalBuyers: 6,
    commissionEarned: 28900,
    monthlyCommission: 18500
  },
  {
    id: 8,
    name: 'Admin User',
    email: 'admin@vanamafoods.com',
    role: 'admin',
    company: 'Vanama Foods',
    phone: '+91 21098 76543',
    location: 'Mumbai',
    joinedDate: '2023-01-01',
    status: 'Active',
    lastLogin: '2024-01-08',
    permissions: ['all']
  }
];

const roleColors = {
  buyer: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: Building },
  seller: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Factory },
  broker: { bg: 'bg-purple-100', text: 'text-purple-800', icon: Handshake },
  admin: { bg: 'bg-orange-100', text: 'text-orange-800', icon: Users }
};

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const buyers = users.filter(u => u.role === 'buyer').length;
  const sellers = users.filter(u => u.role === 'seller').length;
  const brokers = users.filter(u => u.role === 'broker').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage all platform users and their access</p>
        </div>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-gray-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Buyers</p>
              <p className="text-2xl font-bold text-emerald-600">{buyers}</p>
            </div>
            <Building className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sellers</p>
              <p className="text-2xl font-bold text-blue-600">{sellers}</p>
            </div>
            <Factory className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Brokers</p>
              <p className="text-2xl font-bold text-purple-600">{brokers}</p>
            </div>
            <Handshake className="h-8 w-8 text-purple-600" />
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="All">All Roles</option>
                <option value="buyer">Buyers</option>
                <option value="seller">Sellers</option>
                <option value="broker">Brokers</option>
                <option value="admin">Admins</option>
              </select>
            </div>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const roleConfig = roleColors[user.role as keyof typeof roleColors];
                const RoleIcon = roleConfig.icon;
                
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${roleConfig.bg} ${roleConfig.text}`}>
                        <RoleIcon className="h-3 w-3 mr-1" />
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.joinedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' :
                        user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="text-orange-600 hover:text-orange-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        {user.status === 'Active' && (
                          <button className="text-red-600 hover:text-red-900">
                            <Ban className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h2>
                  <p className="text-gray-600">User Profile & Activity</p>
                </div>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium">{selectedUser.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{selectedUser.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${roleColors[selectedUser.role as keyof typeof roleColors].bg} ${roleColors[selectedUser.role as keyof typeof roleColors].text}`}>
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Role-specific metrics */}
              {selectedUser.role === 'buyer' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Buyer Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-emerald-900">Total Orders</p>
                      <p className="text-2xl font-bold text-emerald-600">{selectedUser.totalOrders}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-900">Total Volume</p>
                      <p className="text-2xl font-bold text-blue-600">₹{(selectedUser.totalVolume! / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-purple-900">Credit Limit</p>
                      <p className="text-2xl font-bold text-purple-600">₹{(selectedUser.creditLimit! / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-orange-900">Outstanding</p>
                      <p className="text-2xl font-bold text-orange-600">₹{(selectedUser.outstandingAmount! / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                  {selectedUser.broker && (
                    <p className="text-sm text-gray-600 mt-2">Onboarded by: <span className="font-medium">{selectedUser.broker}</span></p>
                  )}
                </div>
              )}

              {selectedUser.role === 'seller' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Seller Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-900">Total Orders</p>
                      <p className="text-2xl font-bold text-blue-600">{selectedUser.totalOrders}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-green-900">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-600">₹{(selectedUser.totalVolume! / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-purple-900">Products Listed</p>
                      <p className="text-2xl font-bold text-purple-600">{selectedUser.products}</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-yellow-900">Rating</p>
                      <p className="text-2xl font-bold text-yellow-600">{selectedUser.rating}/5</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedUser.role === 'broker' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Broker Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-purple-900">Total Buyers</p>
                      <p className="text-2xl font-bold text-purple-600">{selectedUser.totalBuyers}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-green-900">Total Commission</p>
                      <p className="text-2xl font-bold text-green-600">₹{(selectedUser.commissionEarned! / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-900">Monthly Commission</p>
                      <p className="text-2xl font-bold text-blue-600">₹{(selectedUser.monthlyCommission! / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Joined Date</p>
                  <p className="font-medium">{selectedUser.joinedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Login</p>
                  <p className="font-medium">{selectedUser.lastLogin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedUser.status === 'Active' ? 'bg-green-100 text-green-800' :
                    selectedUser.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Activity Log
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit User
                </button>
                {selectedUser.status === 'Active' && (
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Suspend User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}
