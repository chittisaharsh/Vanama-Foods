import { useState } from 'react';
import { Search, Filter, Star, ShoppingCart, MapPin, Plus, Minus, X } from 'lucide-react';
import { useCart } from "@/react-app/context/CartContext";
import { useNavigate } from "react-router-dom";
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
    category: 'Rice', description: 'Nutritious organic brown rice with high fiber content and healthy for you.'
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
  const navigate = useNavigate();

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
    <div className="space-y-6 relative bg-gradient-to-b from-[#FFFBE6] to-[#F5FBEF] min-h-screen px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#3B7A57]">🌾 Marketplace</h1>
          <p className="text-[#6B705C] mt-1">Discover fresh, quality staples from trusted farms & mills 🍃</p>
        </div>
        {getTotalItems() > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 bg-[#3B7A57] text-white rounded-lg hover:bg-[#2F5233] transition-colors flex items-center space-x-2 shadow-md"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Cart ({getTotalItems()})</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 border border-[#E4E7D1] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B705C] h-4 w-4" />
              <input
                type="text"
                placeholder="Search products or sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-[#C9E4C5] rounded-lg focus:ring-2 focus:ring-[#A7C957] focus:border-[#A7C957] w-full bg-[#FFFFF8]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-[#6B705C]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-[#C9E4C5] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#A7C957] focus:border-[#A7C957] bg-[#FFFFF8]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-[#C9E4C5] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#A7C957] focus:border-[#A7C957] bg-[#FFFFF8]"
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
            <div key={product.id} className="bg-white rounded-xl border border-[#E4E7D1] overflow-hidden hover:shadow-xl transition-all duration-200">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#FFFBE6] rounded-full px-3 py-1 text-xs font-medium text-[#3B7A57] shadow-sm">
                  {product.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-[#2F5233]">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-[#FFD166] fill-current" />
                    <span className="text-sm text-[#6B705C]">{product.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-[#A7C957]" />
                  <span className="text-sm text-[#6B705C]">{product.seller}, {product.location}</span>
                </div>

                <p className="text-sm text-[#6B705C] mb-4">{product.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-[#3B7A57]">₹{product.price}</span>
                    <span className="text-[#6B705C]">/{product.unit}</span>
                  </div>
                  <span className="text-xs text-[#9CA47B]">Min: {product.minOrder}{product.unit}</span>
                </div>

                {qty > 0 ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => dispatch({ type: 'DECREMENT', id: stringId })}
                        className="p-1 rounded-full bg-[#F4D06F]/40 hover:bg-[#F4D06F]/60 transition-colors"
                      >
                        <Minus className="h-4 w-4 text-[#2F5233]" />
                      </button>
                      <span className="font-medium text-[#3B7A57]">{qty}{product.unit}</span>
                      <button
                        onClick={() => dispatch({ type: 'INCREMENT', id: stringId })}
                        className="p-1 rounded-full bg-[#F4D06F]/40 hover:bg-[#F4D06F]/60 transition-colors"
                      >
                        <Plus className="h-4 w-4 text-[#2F5233]" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#6B705C]">Total</div>
                      <div className="font-bold text-[#3B7A57]">₹{(qty * product.price).toLocaleString()}</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
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
                      className="w-full bg-[#3B7A57] text-white py-2 px-4 rounded-lg hover:bg-[#2F5233] transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>

                    {/* 🌿 Order Sample Button */}
                    <button
                      onClick={() => alert(`Sample order requested for ${product.name}`)}
                      className="w-full border border-[#3B7A57] text-[#3B7A57] py-2 px-4 rounded-lg hover:bg-[#E5F4E3] transition-colors"
                    >
                      Order Sample
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
