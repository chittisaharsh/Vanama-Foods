import { useState } from 'react';
import { Search, Filter, Package, Eye, Edit, Ban, CheckCircle, Star, AlertTriangle } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Premium Basmati Rice',
    sku: 'PBR-001',
    seller: 'Suresh Rice Mills',
    sellerLocation: 'Punjab',
    category: 'Rice',
    price: 180,
    unit: 'kg',
    stock: 1250,
    minOrder: 25,
    status: 'Active',
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
    description: 'Premium quality aged basmati rice with long grains and aromatic fragrance.',
    listedDate: '2023-08-15',
    lastUpdated: '2024-01-08',
    totalSales: 2500,
    totalRevenue: 450000,
    qualityScore: 95,
    verificationStatus: 'Verified'
  },
  {
    id: 2,
    name: 'Organic Toor Dal',
    sku: 'OTD-002',
    seller: 'Green Valley Mills',
    sellerLocation: 'Karnataka',
    category: 'Dal',
    price: 95,
    unit: 'kg',
    stock: 890,
    minOrder: 50,
    status: 'Active',
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1596797882870-8eef8b1d4d76?w=300&h=200&fit=crop',
    description: 'Certified organic toor dal, rich in protein and free from chemicals.',
    listedDate: '2023-06-20',
    lastUpdated: '2024-01-07',
    totalSales: 1800,
    totalRevenue: 171000,
    qualityScore: 92,
    verificationStatus: 'Verified'
  },
  {
    id: 3,
    name: 'Whole Wheat Flour',
    sku: 'WWF-003',
    seller: 'North India Mills',
    sellerLocation: 'Haryana',
    category: 'Flour',
    price: 45,
    unit: 'kg',
    stock: 2100,
    minOrder: 100,
    status: 'Active',
    rating: 4.5,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
    description: 'Fresh whole wheat flour milled from premium quality wheat.',
    listedDate: '2023-07-10',
    lastUpdated: '2024-01-06',
    totalSales: 3200,
    totalRevenue: 144000,
    qualityScore: 88,
    verificationStatus: 'Verified'
  },
  {
    id: 4,
    name: 'Brown Rice Organic',
    sku: 'BRO-004',
    seller: 'South Mills Co.',
    sellerLocation: 'Tamil Nadu',
    category: 'Rice',
    price: 120,
    unit: 'kg',
    stock: 150,
    minOrder: 25,
    status: 'Low Stock',
    rating: 4.9,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
    description: 'Nutritious organic brown rice with high fiber content.',
    listedDate: '2023-09-05',
    lastUpdated: '2024-01-05',
    totalSales: 950,
    totalRevenue: 114000,
    qualityScore: 96,
    verificationStatus: 'Verified'
  },
  {
    id: 5,
    name: 'Moong Dal Premium',
    sku: 'MDP-005',
    seller: 'Rajasthan Agro Mills',
    sellerLocation: 'Rajasthan',
    category: 'Dal',
    price: 110,
    unit: 'kg',
    stock: 75,
    minOrder: 25,
    status: 'Low Stock',
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1596797882870-8eef8b1d4d76?w=300&h=200&fit=crop',
    description: 'High-quality moong dal with consistent size and excellent taste.',
    listedDate: '2023-08-25',
    lastUpdated: '2024-01-04',
    totalSales: 1400,
    totalRevenue: 154000,
    qualityScore: 90,
    verificationStatus: 'Verified'
  },
  {
    id: 6,
    name: 'Masoor Dal',
    sku: 'MD-006',
    seller: 'Madhya Pradesh Traders',
    sellerLocation: 'Madhya Pradesh',
    category: 'Dal',
    price: 85,
    unit: 'kg',
    stock: 0,
    minOrder: 50,
    status: 'Out of Stock',
    rating: 4.4,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1596797882870-8eef8b1d4d76?w=300&h=200&fit=crop',
    description: 'Premium quality masoor dal with rich color and taste.',
    listedDate: '2023-10-12',
    lastUpdated: '2024-01-03',
    totalSales: 1200,
    totalRevenue: 102000,
    qualityScore: 85,
    verificationStatus: 'Pending'
  },
  {
    id: 7,
    name: 'Coconut Oil Premium',
    sku: 'COP-007',
    seller: 'Kerala Coconut Mills',
    sellerLocation: 'Kerala',
    category: 'Oil',
    price: 320,
    unit: 'l',
    stock: 450,
    minOrder: 10,
    status: 'Under Review',
    rating: 4.3,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop',
    description: 'Pure coconut oil extracted using traditional methods.',
    listedDate: '2024-01-01',
    lastUpdated: '2024-01-02',
    totalSales: 245,
    totalRevenue: 78400,
    qualityScore: 82,
    verificationStatus: 'Under Review'
  }
];

const statusConfig = {
  'Active': { bg: 'bg-green-100', text: 'text-green-800' },
  'Low Stock': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'Out of Stock': { bg: 'bg-red-100', text: 'text-red-800' },
  'Under Review': { bg: 'bg-orange-100', text: 'text-orange-800' },
  'Suspended': { bg: 'bg-gray-100', text: 'text-gray-800' }
};

const verificationConfig = {
  'Verified': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
  'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
  'Under Review': { bg: 'bg-orange-100', text: 'text-orange-800', icon: AlertTriangle }
};

export default function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterVerification, setFilterVerification] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || product.status === filterStatus;
    const matchesVerification = filterVerification === 'All' || product.verificationStatus === filterVerification;
    return matchesSearch && matchesCategory && matchesStatus && matchesVerification;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'Active').length;
  const lowStockProducts = products.filter(p => p.status === 'Low Stock').length;
  const pendingVerification = products.filter(p => p.verificationStatus === 'Pending' || p.verificationStatus === 'Under Review').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all products listed on the platform</p>
        </div>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
          Quality Audit Report
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
            </div>
            <Package className="h-8 w-8 text-gray-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockProducts}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">{pendingVerification}</p>
            </div>
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-orange-600 rounded-full"></div>
            </div>
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
                placeholder="Search products..."
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
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="All">All Categories</option>
                <option value="Rice">Rice</option>
                <option value="Dal">Dal</option>
                <option value="Flour">Flour</option>
                <option value="Oil">Oil</option>
                <option value="Spices">Spices</option>
              </select>
            </div>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Under Review">Under Review</option>
              <option value="Suspended">Suspended</option>
            </select>
            
            <select 
              value={filterVerification}
              onChange={(e) => setFilterVerification(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="All">All Verification</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const statusStyle = statusConfig[product.status as keyof typeof statusConfig];
                const verificationStyle = verificationConfig[product.verificationStatus as keyof typeof verificationConfig];
                const VerificationIcon = verificationStyle.icon;
                
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img className="h-12 w-12 rounded-lg object-cover" src={product.image} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.seller}</div>
                      <div className="text-sm text-gray-500">{product.sellerLocation}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{product.price}/{product.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">{product.stock} {product.unit}</span>
                        {product.stock <= 100 && (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-900">{product.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({product.reviews})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${verificationStyle.bg} ${verificationStyle.text}`}>
                        <VerificationIcon className="h-3 w-3 mr-1" />
                        {product.verificationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="text-orange-600 hover:text-orange-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        {product.status === 'Active' && (
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

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedProduct.name}</h2>
                  <p className="text-gray-600">Product Details & Performance</p>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Product Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Product Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">SKU:</span>
                        <span className="font-medium">{selectedProduct.sku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{selectedProduct.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium">₹{selectedProduct.price}/{selectedProduct.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min Order:</span>
                        <span className="font-medium">{selectedProduct.minOrder} {selectedProduct.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stock:</span>
                        <span className={`font-medium ${selectedProduct.stock <= 100 ? 'text-orange-600' : 'text-gray-900'}`}>
                          {selectedProduct.stock} {selectedProduct.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{selectedProduct.description}</p>
              </div>

              {/* Seller Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Seller Name</p>
                    <p className="font-medium">{selectedProduct.seller}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{selectedProduct.sellerLocation}</p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-900">Total Sales</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedProduct.totalSales}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-900">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">₹{(selectedProduct.totalRevenue / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-yellow-900">Quality Score</p>
                    <p className="text-2xl font-bold text-yellow-600">{selectedProduct.qualityScore}/100</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-purple-900">Customer Rating</p>
                    <p className="text-2xl font-bold text-purple-600">{selectedProduct.rating}/5</p>
                  </div>
                </div>
              </div>

              {/* Status and Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Status Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[selectedProduct.status as keyof typeof statusConfig].bg} ${statusConfig[selectedProduct.status as keyof typeof statusConfig].text}`}>
                        {selectedProduct.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Verification:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${verificationConfig[selectedProduct.verificationStatus as keyof typeof verificationConfig].bg} ${verificationConfig[selectedProduct.verificationStatus as keyof typeof verificationConfig].text}`}>
                        {selectedProduct.verificationStatus}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Important Dates</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listed Date:</span>
                      <span className="font-medium">{selectedProduct.listedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">{selectedProduct.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Sales History
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Product
                </button>
                {selectedProduct.verificationStatus !== 'Verified' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Approve Product
                  </button>
                )}
                {selectedProduct.status === 'Active' && (
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Suspend Product
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}
