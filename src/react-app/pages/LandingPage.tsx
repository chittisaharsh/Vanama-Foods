import { ArrowRight, TrendingUp, Users, MapPin, Phone, Mail, Star, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {onLogin: () => void;}

export default function LandingPage({}: LandingPageProps) {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login"); // make sure this matches the route for LoginScreen.tsx
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="https://mocha-cdn.com/0199cb41-b89f-7ab2-af11-13858f505668/20250522_1424_Vanama-Foods-Logo_simple_compose_01jvvk2nvkem9abahweq167djt.png" 
                alt="Vanama Foods" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">Vanama Foods</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={goToLogin}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Login
              </button>
              <button 
                onClick={goToLogin}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Revolutionizing India's
              <span className="text-emerald-600 block">Staples Supply Chain</span>
            </h1>
            {/* <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Empowering India's food ecosystem by connecting mills directly to businesses, 
              eliminating middlemen and ensuring trusted, affordable staples delivery.
            </p> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={goToLogin}
                className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={goToLogin}
                className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-semibold text-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transforming B2B Staples Distribution</h2>
            <p className="text-xl text-gray-600">Solving critical challenges in India's fragmented staples market</p>
          </div>

          {/* Problems We Solve */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fragmented Sector</h3>
              <p className="text-gray-600">India's staples sector is largely unorganized, leading to inefficiencies at all levels.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Limited Digital Access</h3>
              <p className="text-gray-600">Staples processors struggle to connect directly with B2B buyers.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trust & Quality Issues</h3>
              <p className="text-gray-600">Buyers frequently receive poor-quality or adulterated products, eroding trust.</p>
            </div>
          </div>

          {/* Our Solution */}
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-6">Our Dual Model Approach</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-xl p-6">
                  <Zap className="h-8 w-8 mb-4 mx-auto" />
                  <h4 className="text-xl font-semibold mb-3">Private Label Model</h4>
                  <p className="text-emerald-100">Source staples from manufacturers, brand under "Vanama Foods", and sell with margins</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <Star className="h-8 w-8 mb-4 mx-auto" />
                  <h4 className="text-xl font-semibold mb-3">Commission Marketplace</h4>
                  <p className="text-emerald-100">Platform for manufacturers to list products directly, earning commissions on GMV</p>
                </div>
              </div>
            </div>
          </div>

          {/* Value Added Services */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Value-Added Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '💳', title: 'Financial Services', desc: 'BNPL credit options to ease working capital constraints' },
                { icon: '🚚', title: 'Integrated Logistics', desc: 'Seamless logistics with cost borne by buyer for asset-light model' },
                { icon: '🤝', title: 'Broker Network', desc: 'Trusted local brokers to onboard buyers and drive adoption' },
                { icon: '🔬', title: 'Quality Assurance', desc: 'Every batch tested and certified for standardization and trust' },
              ].map((service, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Driving Real Impact</h2>
            <p className="text-xl text-gray-600">Our platform is already transforming the staples supply chain</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-sm">
              <div className="text-4xl font-bold text-emerald-600 mb-2">₹50Cr+</div>
              <div className="text-gray-900 font-semibold mb-1">Annual GMV</div>
              <div className="text-gray-600 text-sm">Gross Merchandise Value processed</div>
            </div>
            
            <div className="text-center bg-white rounded-xl p-8 shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-900 font-semibold mb-1">Active Buyers</div>
              <div className="text-gray-600 text-sm">Retailers, wholesalers, and HoReCa</div>
            </div>
            
            <div className="text-center bg-white rounded-xl p-8 shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-gray-900 font-semibold mb-1">Partner Manufacturer</div>
              <div className="text-gray-600 text-sm">Direct partnerships across India</div>
            </div>
            
            <div className="text-center bg-white rounded-xl p-8 shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-900 font-semibold mb-1">Customer Satisfaction</div>
              <div className="text-gray-600 text-sm">Quality and service excellence</div>
            </div>
          </div>

          {/* Target Markets */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Who We Serve</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-emerald-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Retailers</h4>
                <p className="text-gray-600">Small to medium grocery stores looking for quality staples at competitive prices</p>
              </div>
              
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Wholesalers</h4>
                <p className="text-gray-600">Distribution businesses seeking reliable supply chains and better margins</p>
              </div>
              
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">HoReCa Sector</h4>
                <p className="text-gray-600">Hotels, restaurants, and catering businesses requiring bulk staples supply</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://mocha-cdn.com/0199cb41-b89f-7ab2-af11-13858f505668/20250522_1424_Vanama-Foods-Logo_simple_compose_01jvvk2nvkem9abahweq167djt.png" 
                  alt="Vanama Foods" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold">Vanama Foods</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Revolutionizing India's staples supply chain by connecting mills directly to businesses, 
                ensuring quality, transparency, and fair pricing.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">hello@vanamafoods.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Rice & Grains</li>
                <li>Dals & Pulses</li>
                <li>Oils & Spices</li>
                <li>Organic Products</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Partners</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Vanama Foods. All rights reserved. Powering India's food supply chain from mills to markets.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
