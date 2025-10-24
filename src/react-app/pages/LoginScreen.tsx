import { useState } from 'react';
import { Store, Factory, Handshake, Settings, ArrowRight } from 'lucide-react';
import { UserRole } from '@/react-app/App';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
}

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const roleOptions = [
  {
    key: 'buyer' as UserRole,
    title: 'Buyer',
    subtitle: 'Retailer / Wholesaler',
    description: 'Purchase quality staples directly from mills',
    icon: Store,
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    hoverColor: 'hover:bg-emerald-100'
  },
  {
    key: 'seller' as UserRole,
    title: 'Manufacturer',
    subtitle: 'Owner',
    description: 'List your products and reach B2B customers',
    icon: Factory,
    color: 'blue',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    hoverColor: 'hover:bg-blue-100'
  },
  {
    key: 'broker' as UserRole,
    title: 'Broker',
    subtitle: 'Sales Partner',
    description: 'Connect buyers to the platform and earn commission',
    icon: Handshake,
    color: 'purple',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    hoverColor: 'hover:bg-purple-100'
  },
  {
    key: 'admin' as UserRole,
    title: 'Admin',
    subtitle: 'Vanama Foods Staff',
    description: 'Manage platform operations and oversight',
    icon: Settings,
    color: 'orange',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-200',
    hoverColor: 'hover:bg-orange-100'
  }
];

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowLoginForm(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      // Mock login - in real app this would authenticate with backend
      const mockUser: User = {
        id: '1',
        name: selectedRole === 'buyer' ? 'Rajesh Kumar' : 
              selectedRole === 'seller' ? 'Suresh Mill Owner' :
              selectedRole === 'broker' ? 'Priya Sharma' : 'Admin User',
        email: `${selectedRole}@example.com`,
        role: selectedRole,
        company: selectedRole === 'buyer' ? 'Kumar Grocery Store' :
                selectedRole === 'seller' ? 'Suresh Rice Mills' :
                selectedRole === 'broker' ? 'Sharma Sales Agency' : 'Vanama Foods'
      };
      onLogin(mockUser);
    }
  };

  const goBack = () => {
    setShowLoginForm(false);
    setSelectedRole(null);
  };

  if (showLoginForm && selectedRole) {
    const roleOption = roleOptions.find(r => r.key === selectedRole)!;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className={`w-16 h-16 ${roleOption.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <roleOption.icon className={`h-8 w-8 ${roleOption.iconColor}`} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Login as {roleOption.title}
              </h2>
              <p className="text-gray-600">{roleOption.subtitle}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your email"
                  defaultValue={`${selectedRole}@example.com`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your password"
                  defaultValue="password123"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <span>Login to Platform</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <button
              onClick={goBack}
              className="w-full mt-4 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to role selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <img 
              src="https://mocha-cdn.com/0199cb41-b89f-7ab2-af11-13858f505668/20250522_1424_Vanama-Foods-Logo_simple_compose_01jvvk2nvkem9abahweq167djt.png" 
              alt="Vanama Foods" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vanama Foods</h1>
              <p className="text-sm text-gray-600">B2B Staples Marketplace</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Vanama Foods Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your role to access your personalized portal and start connecting 
            with India's staples supply chain ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleOptions.map((role) => (
            <div
              key={role.key}
              onClick={() => handleRoleSelect(role.key)}
              className={`
                bg-white rounded-xl p-8 border-2 ${role.borderColor} cursor-pointer 
                transition-all duration-200 hover:scale-105 hover:shadow-lg ${role.hoverColor}
                group
              `}
            >
              <div className="text-center">
                <div className={`w-16 h-16 ${role.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <role.icon className={`h-8 w-8 ${role.iconColor}`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {role.title}
                </h3>
                
                <p className="text-sm font-medium text-gray-600 mb-3">
                  {role.subtitle}
                </p>
                
                <p className="text-sm text-gray-500 leading-relaxed">
                  {role.description}
                </p>
                
                <div className="mt-6">
                  <div className={`inline-flex items-center text-sm font-medium ${role.iconColor} group-hover:underline`}>
                    Access Portal
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice
        <div className="mt-16 bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Interactive Demo Platform
            </h3>
            <p className="text-gray-600 mb-4">
              This is a demonstration of the Vanama Foods B2B marketplace. 
              All data is simulated for showcase purposes.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span>• Demo credentials are pre-filled</span>
              <span>• All features are functional</span>
              <span>• Data resets on refresh</span>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
}
