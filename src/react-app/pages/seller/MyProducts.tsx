import { useState } from 'react';
import { Plus, Search, Filter, Edit, Eye, Package, Star } from 'lucide-react';
import bas from "@/assets/Basmati.png";
import bro from "@/assets/brown_rice.png";
import md from "@/assets/Moong_daal.png";
import whe from "@/assets/Wheatflour.png";
import toor from "@/assets/toor_daal.png";
import mas from "@/assets/masoor_daal.png";



const products = [
  {
    id: 1,
    name: 'Premium Basmati Rice',
    sku: 'PBR-001',
    category: 'Rice',
    price: 180,
    unit: 'kg',
    stock: 1250,
    minOrder: 25,
    status: 'Active',
    rating: 4.8,
    reviews: 156,
    image: bas,
    description: 'Premium quality aged basmati rice with long grains and aromatic fragrance.',
    salesThisMonth: 450,
    revenue: 81000
  },
  {
    id: 2,
    name: 'Organic Toor Dal',
    sku: 'OTD-002',
    category: 'Dal',
    price: 95,
    unit: 'kg',
    stock: 890,
    minOrder: 50,
    status: 'Active',
    rating: 4.6,
    reviews: 89,
    image: toor,
    description: 'Certified organic toor dal, rich in protein and free from chemicals.',
    salesThisMonth: 320,
    revenue: 30400
  },
  {
    id: 3,
    name: 'Whole Wheat Flour',
    sku: 'WWF-003',
    category: 'Flour',
    price: 45,
    unit: 'kg',
    stock: 2100,
    minOrder: 100,
    status: 'Active',
    rating: 4.5,
    reviews: 312,
    image: whe,
    description: 'Fresh whole wheat flour milled from premium quality wheat.',
    salesThisMonth: 680,
    revenue: 30600
  },
  {
    id: 4,
    name: 'Brown Rice Organic',
    sku: 'BRO-004',
    category: 'Rice',
    price: 120,
    unit: 'kg',
    stock: 150,
    minOrder: 25,
    status: 'Low Stock',
    rating: 4.9,
    reviews: 94,
    image: bro,
    description: 'Nutritious organic brown rice with high fiber content.',
    salesThisMonth: 180,
    revenue: 21600
  },
  {
    id: 5,
    name: 'Moong Dal Premium',
    sku: 'MDP-005',
    category: 'Dal',
    price: 110,
    unit: 'kg',
    stock: 75,
    minOrder: 25,
    status: 'Low Stock',
    rating: 4.7,
    reviews: 203,
    image: md,
    description: 'High-quality moong dal with consistent size and excellent taste.',
    salesThisMonth: 140,
    revenue: 15400
  },
  {
    id: 6,
    name: 'Masoor Dal',
    sku: 'MD-006',
    category: 'Dal',
    price: 85,
    unit: 'kg',
    stock: 0,
    minOrder: 50,
    status: 'Out of Stock',
    rating: 4.4,
    reviews: 167,
    image: mas,
    description: 'Premium quality masoor dal with rich color and taste.',
    salesThisMonth: 0,
    revenue: 0
  }
];

const categories = ['All', 'Rice', 'Dal', 'Flour', 'Oil', 'Spices'];

export default function MyProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = filterStatus === 'All' || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'Active').length;
  const lowStockProducts = products.filter(p => p.status === 'Low Stock').length;
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
          <p className="text-gray-600 mt-1">Manage your product listings and inventory</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
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
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-orange-600">{lowStockProducts}</p>
            </div>
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-orange-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-emerald-600">₹{(totalRevenue / 1000).toFixed(0)}K</p>
            </div>
            <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 text-xs font-bold">₹</span>
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-700 shadow-sm">
                {product.category}
              </div>
              <div className="absolute top-4 left-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  product.status === 'Active' ? 'bg-green-100 text-green-800' :
                  product.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">SKU: {product.sku}</p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="font-medium">₹{product.price}/{product.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Stock:</span>
                  <span className={`font-medium ${product.stock < 100 ? 'text-orange-600' : 'text-gray-900'}`}>
                    {product.stock} {product.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Month:</span>
                  <span className="font-medium text-emerald-600">
                    {product.salesThisMonth} units (₹{product.revenue.toLocaleString()})
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">View</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Edit className="h-4 w-4" />
                  <span className="text-sm">Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Auto-generated"
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select category</option>
                    <option value="Rice">Rice</option>
                    <option value="Dal">Dal</option>
                    <option value="Flour">Flour</option>
                    <option value="Oil">Oil</option>
                    <option value="Spices">Spices</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="l">Liter (l)</option>
                    <option value="ml">Milliliter (ml)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Unit</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Enter product description"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-600">Upload product image or provide URL</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </form>
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
