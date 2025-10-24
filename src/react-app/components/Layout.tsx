import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  FileText, 
  TrendingUp,
  Settings,
  Search,
  Bell
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "CRM", href: "/crm", icon: Users },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Finance", href: "/finance", icon: FileText },
  { name: "Marketing", href: "/marketing", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface LayoutProps {
  onLogout: () => void;
}

export default function Layout({ onLogout }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
          <img 
            src="https://mocha-cdn.com/0199cb41-b89f-7ab2-af11-13858f505668/20250522_1424_Vanama-Foods-Logo_simple_compose_01jvvk2nvkem9abahweq167djt.png" 
            alt="Vanama ERP" 
            className="h-8 w-auto"
          />
          <span className="ml-3 text-xl font-bold text-gray-900">VanamaERP</span>
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
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon 
                    className={`
                      mr-3 h-5 w-5 transition-colors duration-200
                      ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}
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
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-80"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-emerald-700">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Admin</p>
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
