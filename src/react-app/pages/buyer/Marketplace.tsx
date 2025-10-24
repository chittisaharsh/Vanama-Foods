import { useState } from 'react';
import { Search, Filter, Star, ShoppingCart, MapPin, Plus, Minus, X } from 'lucide-react';
import { useCart } from "@/react-app/context/CartContext";
import { useNavigate } from "react-router-dom";  // ✅ Added this
import bas from "@/assets/Basmati.png";
import bro from "@/assets/brown_rice.png";
import md from "@/assets/Moong_daal.png";
import whe from "@/assets/Wheatflour.png";
import toor from "@/assets/toor_daal.png";
import mas from "@/assets/masoor_daal.png";

type CartItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  minOrder: number;
  quantity: number;
  image?: string;
};

const products = [
  {
    id: 1, name: 'Premium Basmati Rice', seller: 'Suresh Rice Mills', location: 'Punjab',
    price: 180, unit: 'tons', minOrder: 25, rating: 4.8, reviews: 156,
    image: bas,
    category: 'Rice', description: 'Premium quality aged basmati rice with long grains and aromatic fragrance.'
  },
  {
    id: 2, name: 'Organic Toor Dal', seller: 'Green Valley Mills', location: 'Karnataka',
    price: 95, unit: 'tons', minOrder: 50, rating: 4.6, reviews: 89,
    image: toor,
    category: 'Dal', description: 'Certified organic toor dal, rich in protein and free from chemicals.'
  },
  {
    id: 3, name: 'Moong Dal Premium', seller: 'Rajasthan Agro Mills', location: 'Rajasthan',
    price: 110, unit: 'tons', minOrder: 25, rating: 4.7, reviews: 203,
    image: md,
    category: 'Dal', description: 'High-quality moong dal with consistent size and excellent taste.'
  },
  {
    id: 4, name: 'Whole Wheat Flour', seller: 'North India Mills', location: 'Haryana',
    price: 45, unit: 'tons', minOrder: 100, rating: 4.5, reviews: 312,
    image: whe,
    category: 'Flour', description: 'Fresh whole wheat flour milled from premium quality wheat.'
  },
  {
    id: 5, name: 'Masoor Dal', seller: 'Madhya Pradesh Traders', location: 'Madhya Pradesh',
    price: 85, unit: 'tons', minOrder: 50, rating: 4.4, reviews: 167,
    image: mas,
    category: 'Dal', description: 'Premium quality masoor dal with rich color and taste.'
  },
  {
    id: 6, name: 'Brown Rice Organic', seller: 'South Mills Co.', location: 'Tamil Nadu',
    price: 120, unit: 'tons', minOrder: 25, rating: 4.9, reviews: 94,
    image: bro,
    category: 'Rice', description: 'Nutritious organic brown rice with high fiber content and healty for you.'
  },
];

const categories = ['All', 'Rice', 'Dal', 'Flour', 'Oil', 'Spices'];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { state: cartState, dispatch } = useCart();
  const cartItems: CartItem[] = (cartState.items as CartItem[]) || [];
  const navigate = useNavigate(); // ✅ Hook to navigate to checkout page

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  const getQuantity = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-1">Discover quality staples directly from trusted mills</p>
        </div>
        {getTotalItems() > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Cart ({getTotalItems()})</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products or sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const stringId = String(product.id);
          const qty = getQuantity(stringId);
          return (
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
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{product.seller}, {product.location}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-gray-600">/{product.unit}</span>
                  </div>
                  <span className="text-xs text-gray-500">Min: {product.minOrder}{product.unit}</span>
                </div>

                {qty > 0 ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => dispatch({ type: 'DECREMENT', id: stringId })}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-medium">{qty}{product.unit}</span>
                      <button
                        onClick={() => dispatch({ type: 'INCREMENT', id: stringId })}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Total</div>
                      <div className="font-bold text-emerald-600">₹{(qty * product.price).toLocaleString()}</div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => dispatch({
                      type: 'ADD_ITEM',
                      item: {
                        id: stringId,
                        name: product.name,
                        price: product.price,
                        quantity: product.minOrder,
                        image: product.image,
                      }
                    })}
                    className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 🌿 Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50 transition-all duration-300">
          <div className="w-full md:w-1/2 h-full bg-gradient-to-b from-emerald-50 to-amber-50 backdrop-blur-lg shadow-2xl rounded-l-3xl p-6 flex flex-col animate-slideIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-amber-200 pb-3">
              <div>
                <h2 className="text-3xl font-bold text-emerald-800 flex items-center space-x-2">
                  <span>🧺</span>
                  <span>Your Cart</span>
                </h2>
                <p className="text-sm text-amber-800/70">Fresh from the farm, packed with care</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-amber-100 rounded-full transition"
                aria-label="Close cart"
              >
                <X className="h-6 w-6 text-emerald-700" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
              {cartItems.length === 0 ? (
                <p className="text-amber-800 text-center mt-16 text-lg">🧺 Your basket is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white/70 rounded-xl border border-amber-100 p-4 mb-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border border-amber-200"
                      />
                      <div>
                        <h3 className="font-semibold text-emerald-900">{item.name}</h3>
                        <p className="text-sm text-amber-800/70">₹{item.price} × {item.quantity}</p>
                        <p className="font-medium text-emerald-700 mt-1">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => dispatch({ type: "DECREMENT", id: item.id })}
                        className="p-1.5 rounded-full bg-amber-100 hover:bg-amber-200"
                      >
                        <Minus className="h-4 w-4 text-emerald-800" />
                      </button>
                      <span className="text-lg font-semibold text-emerald-900">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: "INCREMENT", id: item.id })}
                        className="p-1.5 rounded-full bg-amber-100 hover:bg-amber-200"
                      >
                        <Plus className="h-4 w-4 text-emerald-800" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Recommended Products */}
            {cartItems.length > 0 && (
              <div className="mt-6 border-t border-amber-200 pt-4">
                <h3 className="text-lg font-semibold text-emerald-900 mb-3">🌾 You might also like</h3>
                <div className="grid grid-cols-2 gap-3">
                  {products
                    .filter((p) => !cartItems.some((i) => i.id === String(p.id)))
                    .slice(0, 2)
                    .map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center bg-white/60 rounded-lg p-3 shadow-sm border border-amber-100 hover:shadow-md transition-all"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-14 rounded-lg object-cover border border-amber-200"
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-emerald-800">{p.name}</p>
                          <p className="text-xs text-amber-800/70">₹{p.price}/{p.unit}</p>
                        </div>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "ADD_ITEM",
                              item: {
                                id: String(p.id),
                                name: p.name,
                                price: p.price,
                                quantity: p.minOrder,
                                image: p.image,
                              },
                            })
                          }
                          className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="border-t mt-6 pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold text-emerald-900">
                <span>Total</span>
                <span>₹{getTotalPrice().toLocaleString()}</span>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/checkout");
                }}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl text-lg font-medium shadow-md hover:shadow-xl transition-all duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
