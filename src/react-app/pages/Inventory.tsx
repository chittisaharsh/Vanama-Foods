import { useState } from 'react';
import { Package, AlertTriangle, Plus, Search, Filter, TrendingDown, TrendingUp } from 'lucide-react';
import MetricCard from '@/react-app/components/MetricCard';
import Chart from '@/react-app/components/Chart';

// Mock data for inventory
const products = [
  { id: 1, name: 'Organic Brown Rice', sku: 'ORG-RICE-001', category: 'Grains', stock: 1250, reorderLevel: 200, unitCost: '$3.50', sellPrice: '$6.99', status: 'In Stock' },
  { id: 2, name: 'Quinoa Seeds', sku: 'QUI-SEED-002', category: 'Grains', stock: 45, reorderLevel: 100, unitCost: '$8.25', sellPrice: '$15.99', status: 'Low Stock' },
  { id: 3, name: 'Chia Seeds', sku: 'CHI-SEED-003', category: 'Seeds', stock: 890, reorderLevel: 150, unitCost: '$12.50', sellPrice: '$24.99', status: 'In Stock' },
  { id: 4, name: 'Coconut Oil', sku: 'COC-OIL-004', category: 'Oils', stock: 320, reorderLevel: 75, unitCost: '$18.00', sellPrice: '$32.99', status: 'In Stock' },
  { id: 5, name: 'Hemp Hearts', sku: 'HMP-HRT-005', category: 'Seeds', stock: 12, reorderLevel: 50, unitCost: '$22.00', sellPrice: '$39.99', status: 'Critical' },
  { id: 6, name: 'Almond Flour', sku: 'ALM-FLR-006', category: 'Flours', stock: 680, reorderLevel: 100, unitCost: '$15.75', sellPrice: '$28.99', status: 'In Stock' },
];

const lowStockItems = products.filter(p => p.stock <= p.reorderLevel);

const inventoryMovement = [
  { name: 'Jan 1', inbound: 1250, outbound: 890 },
  { name: 'Jan 2', inbound: 890, outbound: 1100 },
  { name: 'Jan 3', inbound: 1450, outbound: 950 },
  { name: 'Jan 4', inbound: 750, outbound: 1200 },
  { name: 'Jan 5', inbound: 1650, outbound: 890 },
  { name: 'Jan 6', inbound: 980, outbound: 1350 },
  { name: 'Jan 7', inbound: 1200, outbound: 1050 },
];

const categoryBreakdown = [
  { name: 'Grains', value: 35 },
  { name: 'Seeds', value: 28 },
  { name: 'Oils', value: 20 },
  { name: 'Flours', value: 17 },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalValue = products.reduce((sum, product) => {
    const cost = parseFloat(product.unitCost.replace('$', ''));
    return sum + (product.stock * cost);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track stock levels, manage products, and monitor inventory movements</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Products"
          value="2,847"
          change="+12"
          changeType="increase"
          icon={Package}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          change="+8.5%"
          changeType="increase"
          icon={TrendingUp}
          iconColor="text-green-600"
        />
        <MetricCard
          title="Low Stock Items"
          value={lowStockItems.length}
          change="-3"
          changeType="decrease"
          icon={AlertTriangle}
          iconColor="text-orange-600"
        />
        <MetricCard
          title="Out of Stock"
          value="7"
          change="-2"
          changeType="decrease"
          icon={TrendingDown}
          iconColor="text-red-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Movement (Last 7 Days)</h3>
          <Chart
            type="line"
            data={inventoryMovement}
            dataKey="inbound"
            xKey="name"
            color="#10b981"
            height={250}
          />
        </div>
        <Chart
          type="pie"
          data={categoryBreakdown}
          dataKey="value"
          title="Inventory by Category"
          height={300}
        />
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-orange-900">Low Stock Alert</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.sku}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    item.status === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {item.stock} units
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="All">All Categories</option>
                <option value="Grains">Grains</option>
                <option value="Seeds">Seeds</option>
                <option value="Oils">Oils</option>
                <option value="Flours">Flours</option>
              </select>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="All">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Critical">Critical</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Product Inventory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sell Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">{product.stock}</span>
                      {product.stock <= product.reorderLevel && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.unitCost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sellPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      product.status === 'Critical' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-emerald-600 hover:text-emerald-900">Edit</button>
                      <button className="text-blue-600 hover:text-blue-900">Reorder</button>
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
