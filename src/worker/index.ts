import { Hono } from "hono";
import { cors } from "hono/cors";

interface Env {
  // Add your environment bindings here, for example:
  // DB: D1Database;
  // API_KEY: string;
}

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for all routes
app.use("*", cors());

// Health check endpoint
app.get("/api/health", (c) => {
  return c.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Dashboard data endpoint
app.get("/api/dashboard", (c) => {
  return c.json({
    metrics: {
      totalRevenue: 108000,
      ordersThisMonth: 247,
      activeCustomers: 1429,
      conversionRate: 3.2
    },
    recentActivity: [
      { id: 1, type: 'order', message: 'New order #SO-2024-001 from Whole Foods Market', time: '5 minutes ago' },
      { id: 2, type: 'payment', message: 'Payment received for invoice #INV-2024-089', time: '12 minutes ago' },
      { id: 3, type: 'customer', message: 'New customer registration: Green Valley Co-op', time: '1 hour ago' }
    ]
  });
});

// CRM endpoints
app.get("/api/crm/customers", (c) => {
  const customers = [
    { id: 1, name: 'Whole Foods Market', contact: 'Sarah Johnson', email: 'sarah@wholefoods.com', phone: '+1 (555) 123-4567', type: 'Retail Chain', status: 'Active', lastOrder: '2024-01-08', value: '$45,200' },
    { id: 2, name: 'Green Valley Co-op', contact: 'Mike Chen', email: 'mike@greenvalley.com', phone: '+1 (555) 234-5678', type: 'Cooperative', status: 'Active', lastOrder: '2024-01-06', value: '$28,750' },
    { id: 3, name: 'Organic Market Plus', contact: 'Lisa Rodriguez', email: 'lisa@organicplus.com', phone: '+1 (555) 345-6789', type: 'Specialty Store', status: 'Active', lastOrder: '2024-01-05', value: '$32,100' },
  ];
  return c.json(customers);
});

// Sales endpoints
app.get("/api/sales/orders", (c) => {
  const orders = [
    { id: 1, orderNumber: 'SO-2024-001', customer: 'Whole Foods Market', contact: 'Sarah Johnson', date: '2024-01-08', status: 'Fulfilled', amount: '$8,750', items: 12 },
    { id: 2, orderNumber: 'SO-2024-002', customer: 'Green Valley Co-op', contact: 'Mike Chen', date: '2024-01-07', status: 'Pending', amount: '$5,200', items: 8 },
    { id: 3, orderNumber: 'SO-2024-003', customer: 'Organic Market Plus', contact: 'Lisa Rodriguez', date: '2024-01-06', status: 'Processing', amount: '$12,300', items: 15 },
  ];
  return c.json(orders);
});

// Inventory endpoints
app.get("/api/inventory/products", (c) => {
  const products = [
    { id: 1, name: 'Organic Brown Rice', sku: 'ORG-RICE-001', category: 'Grains', stock: 1250, reorderLevel: 200, unitCost: '$3.50', sellPrice: '$6.99', status: 'In Stock' },
    { id: 2, name: 'Quinoa Seeds', sku: 'QUI-SEED-002', category: 'Grains', stock: 45, reorderLevel: 100, unitCost: '$8.25', sellPrice: '$15.99', status: 'Low Stock' },
    { id: 3, name: 'Chia Seeds', sku: 'CHI-SEED-003', category: 'Seeds', stock: 890, reorderLevel: 150, unitCost: '$12.50', sellPrice: '$24.99', status: 'In Stock' },
  ];
  return c.json(products);
});

// Finance endpoints
app.get("/api/finance/invoices", (c) => {
  const invoices = [
    { id: 1, number: 'INV-2024-001', customer: 'Whole Foods Market', date: '2024-01-08', dueDate: '2024-02-07', amount: '$8,750', status: 'Paid' },
    { id: 2, number: 'INV-2024-002', customer: 'Green Valley Co-op', date: '2024-01-07', dueDate: '2024-02-06', amount: '$5,200', status: 'Pending' },
    { id: 3, number: 'INV-2024-003', customer: 'Organic Market Plus', date: '2024-01-06', dueDate: '2024-02-05', amount: '$12,300', status: 'Overdue' },
  ];
  return c.json(invoices);
});

// Marketing endpoints
app.get("/api/marketing/campaigns", (c) => {
  const campaigns = [
    { id: 1, name: 'Spring Harvest 2024', type: 'Email', status: 'Active', budget: '$5,000', spend: '$3,250', startDate: '2024-01-01', endDate: '2024-03-31', impressions: 125000, clicks: 3750, conversions: 186, roi: '285%' },
    { id: 2, name: 'Organic Awareness Drive', type: 'Social Media', status: 'Active', budget: '$8,500', spend: '$6,100', startDate: '2024-01-15', endDate: '2024-02-29', impressions: 89000, clicks: 2890, conversions: 142, roi: '198%' },
    { id: 3, name: 'Health Food Expo', type: 'Event', status: 'Completed', budget: '$12,000', spend: '$11,750', startDate: '2023-12-01', endDate: '2023-12-31', impressions: 45000, clicks: 1250, conversions: 89, roi: '156%' },
  ];
  return c.json(campaigns);
});

// Analytics endpoints
app.get("/api/analytics/revenue", (c) => {
  return c.json([
    { name: 'Jan', value: 85000 },
    { name: 'Feb', value: 92000 },
    { name: 'Mar', value: 88000 },
    { name: 'Apr', value: 95000 },
    { name: 'May', value: 102000 },
    { name: 'Jun', value: 108000 },
  ]);
});

app.get("/api/analytics/sales", (c) => {
  return c.json([
    { name: 'Q1', value: 275000 },
    { name: 'Q2', value: 310000 },
    { name: 'Q3', value: 295000 },
    { name: 'Q4', value: 340000 },
  ]);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

export default app;
