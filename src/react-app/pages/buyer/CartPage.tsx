import { useCart } from "@/react-app/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✅ Import CartItem type from CartContext for consistency
import type { CartItem } from "@/react-app/context/CartContext";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  // ✅ Correctly typed items array
  const items: CartItem[] = state.items || [];

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* 🛒 Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">
                ₹{item.price}/{item.unit || "unit"}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {/* Decrement */}
              <button
                onClick={() =>
                  dispatch({
                    type: "DECREMENT",
                    id: String(item.id),
                    amount: item.minOrder || 1,
                  })
                }
                className="p-1 rounded bg-gray-100 hover:bg-gray-200 transition"
              >
                <Minus className="h-4 w-4" />
              </button>

              {/* Quantity */}
              <span className="w-6 text-center font-medium">
                {item.quantity}
              </span>

              {/* Increment */}
              <button
                onClick={() =>
                  dispatch({
                    type: "INCREMENT",
                    id: String(item.id),
                    amount: item.minOrder || 1,
                  })
                }
                className="p-1 rounded bg-gray-100 hover:bg-gray-200 transition"
              >
                <Plus className="h-4 w-4" />
              </button>

              {/* Remove */}
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", id: String(item.id) })
                }
                className="text-red-500 hover:text-red-600 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 💰 Total */}
      <div className="flex justify-between text-xl font-semibold border-t pt-4">
        <span>Total:</span>
        <span>₹{total.toLocaleString()}</span>
      </div>

      {/* ✅ Checkout Button */}
      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
