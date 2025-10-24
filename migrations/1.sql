
-- Companies/Customers table
CREATE TABLE companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT,
  company_type TEXT, -- 'customer', 'vendor', 'both'
  status TEXT, -- 'active', 'inactive'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contacts table for CRM
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  title TEXT,
  is_primary BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products/Items table
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  sku TEXT,
  description TEXT,
  category TEXT,
  unit_price REAL,
  cost_price REAL,
  quantity_on_hand INTEGER DEFAULT 0,
  reorder_level INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sales Orders table
CREATE TABLE sales_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT,
  company_id INTEGER,
  contact_id INTEGER,
  order_date DATE,
  status TEXT, -- 'draft', 'pending', 'fulfilled', 'cancelled'
  subtotal REAL,
  tax_amount REAL,
  total_amount REAL,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sales Order Line Items
CREATE TABLE sales_order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sales_order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  unit_price REAL,
  line_total REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Purchase Orders table
CREATE TABLE purchase_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT,
  vendor_id INTEGER,
  order_date DATE,
  expected_date DATE,
  status TEXT, -- 'draft', 'sent', 'received', 'cancelled'
  subtotal REAL,
  tax_amount REAL,
  total_amount REAL,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Invoices table
CREATE TABLE invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_number TEXT,
  company_id INTEGER,
  sales_order_id INTEGER,
  invoice_date DATE,
  due_date DATE,
  status TEXT, -- 'draft', 'sent', 'paid', 'overdue', 'cancelled'
  subtotal REAL,
  tax_amount REAL,
  total_amount REAL,
  paid_amount REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Marketing Campaigns table
CREATE TABLE marketing_campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  campaign_type TEXT, -- 'email', 'social', 'ppc', 'content'
  status TEXT, -- 'draft', 'active', 'paused', 'completed'
  start_date DATE,
  end_date DATE,
  budget REAL,
  spend REAL DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_contacts_company_id ON contacts(company_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_sales_orders_company_id ON sales_orders(company_id);
CREATE INDEX idx_sales_order_items_order_id ON sales_order_items(sales_order_id);
CREATE INDEX idx_invoices_company_id ON invoices(company_id);
