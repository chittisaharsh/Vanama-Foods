import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart,
  Search,
  Bell,
  Settings
} from "lucide-react";

const navigation = [
  { name: "Platform Overview", href: "/", icon: LayoutDashboard },
  { name: "User Management", href: "/users", icon: Users },
  { name: "Product Management", href: "/products", icon: Package },
  { name: "Order Management", href: "/orders", icon: ShoppingCart },
];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: string;
}

interface AdminLayoutProps {
  user: User;
  onLogout: () => void;
}

export default function AdminLayout({ user, onLogout }: AdminLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
          <img 
            src="https://mocha-cdn.com/0199cb41-b89f-7ab2-af11-13858f505668/20250522_1424_Vanama-Foods-Logo_simple_compose_01jvvk2nvkem9abahweq167djt.png" 
            alt="Vanama Foods" 
            className="h-8 w-auto"
          />
          <span className="ml-3 text-xl font-bold text-gray-900">Admin Portal</span>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-200 bg-orange-50">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Settings className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600">{user.company}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon 
                    className={`
                      mr-3 h-5 w-5 transition-colors duration-200
                      ${isActive ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}
                    `} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search platform..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-80"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                8
              </span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-orange-700">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Platform Admin</p>
              </div>
              <button 
                onClick={onLogout}
                className="ml-4 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
