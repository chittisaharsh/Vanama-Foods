

export type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
};

export type Order = {
  id: number;
  buyerName: string;
  address: string;
  status:
    | "Pending"
    | "Processing"
    | "Ready to Ship"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "In Transit";
  date: string;
  items: OrderItem[];
  total: number;
};

const STORAGE_KEY = "orders";
const EVENT_KEY = "orders-changed";

function read(): Order[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

function write(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event(EVENT_KEY));
}

export function getOrders(): Order[] {
  const data = read();
  if (data.length) return data;

  // 🟡 Seed sample orders to avoid empty states
  const seed: Order[] = [
    {
      id: 1001,
      buyerName: "Shree Traders",
      address: "Pune, MH",
      status: "Processing",
      date: new Date().toISOString(),
      items: [{ id: 1, name: "Wheat", quantity: 50, unit: "kg", price: 28 }],
      total: 50 * 28,
    },
    {
      id: 1002,
      buyerName: "Annapurna Foods",
      address: "Mumbai, MH",
      status: "Delivered",
      date: new Date(Date.now() - 86400000).toISOString(),
      items: [{ id: 2, name: "Rice", quantity: 100, unit: "kg", price: 36 }],
      total: 100 * 36,
    },
  ];

  write(seed);
  return seed;
}


export function updateOrder(
  id: number,
  patch: Partial<Order> | ((order: Order) => Partial<Order>)
) {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return;

  const currentOrder = orders[index];
  const patchObject =
    typeof patch === "function" ? patch(currentOrder) : patch;

  orders[index] = { ...currentOrder, ...patchObject };
  write(orders);
}


export function addOrder(newOrder: Omit<Order, "id" | "date">) {
  const orders = getOrders();
  const id = Date.now(); // simple unique ID
  const order: Order = {
    ...newOrder,
    id,
    date: new Date().toISOString(),
  };
  orders.push(order);
  write(orders);
  return order;
}


export function listenForOrderChanges(callback: () => void) {
  const handler = () => callback();
  window.addEventListener(EVENT_KEY, handler);
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) callback();
  });

  return () => {
    window.removeEventListener(EVENT_KEY, handler);
  };
}
