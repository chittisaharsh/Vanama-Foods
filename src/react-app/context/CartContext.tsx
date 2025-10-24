import React, { createContext, useContext, useReducer, ReactNode } from "react";

export type CartItem = {
  id: string;              // keep IDs as strings everywhere
  name: string;
  price: number;
  quantity: number;
  unit?: string;           // ✅ add this (used in UI)
  minOrder?: number;       // ✅ add this (used for quantity controls)
  image?: string;
};


type CartState = {
  items: CartItem[];
};

// type CartAction =
//   | { type: "ADD_ITEM"; item: CartItem }
//   | { type: "REMOVE_ITEM"; id: string }
//   | { type: "CLEAR_CART" }
//   | { type: "INCREMENT"; id: string }
//   | { type: "DECREMENT"; id: string };


type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "CLEAR_CART" }
  | { type: "INCREMENT"; id: string; amount?: number } // ✅ added amount
  | { type: "DECREMENT"; id: string; amount?: number }; // ✅ added amount


const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: { items: [] },
  dispatch: () => null,
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.item] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map(i =>
            i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter(i => i.quantity > 0),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
