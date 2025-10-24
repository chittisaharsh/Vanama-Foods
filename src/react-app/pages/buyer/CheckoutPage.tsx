import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/react-app/context/CartContext";
import { useToast } from "@/react-app/context/ToastContext";
import { addOrder } from "@/utils/orders";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const { showToast } = useToast();

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Load Razorpay script dynamically
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Handle Checkout Payment
  const handleCheckout = async () => {
    if (!address.trim()) {
      showToast("🚨 Please enter a delivery address", "error");
      return;
    }

    try {
      // Load Razorpay script before using it
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        showToast("⚠️ Failed to load Razorpay. Check your connection.", "error");
        return;
      }

      // 🔹 Create Razorpay order (backend call)
      const response = await fetch("https://vanama-backend.onrender.com/create-order", {
        method: "POST",
        mode: "cors",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number(total) }),
      });

      const orderData = await response.json();
      console.log("🧾 Razorpay order created:", orderData);

      if (!orderData.id) {
        showToast("❌ Failed to create Razorpay order. Try again.", "error");
        return;
      }

      // ✅ Configure Razorpay Checkout
      const options = {
        key: "rzp_test_RUZAYqUISCIFD4",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Vanama Foods",
        description: "Order Payment",
        order_id: orderData.id,
        handler: function (response: any) {
          console.log("✅ Payment successful:", response);

          const newOrder = {
            id: `order_${Date.now()}`,
            buyerName: "Guest Buyer",
            address: address,
            status: "Processing",
            items: state.items,
            total: total,
            paymentId: response.razorpay_payment_id,
            date: new Date().toLocaleDateString(),
          };

          addOrder(newOrder as any);
          dispatch({ type: "CLEAR_CART" });
          showToast("✅ Payment & Order placed successfully!", "success");
          navigate("/orders");
        },
        prefill: {
          name: "Guest Buyer",
          email: "guest@vanamafoods.com",
          contact: "9999999999",
        },
        theme: { color: "#059669" },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response: any) {
        console.error("❌ Payment failed:", response.error);
        showToast("❌ Payment failed. Please try again.", "error");
      });

      razorpay.open();
    } catch (error) {
      console.error("❌ Razorpay Checkout Error:", error);
      showToast("❌ Payment failed. Please try again.", "error");
    }
  };

  // ✅ Handle Sample Orders
  const handleOrderSamples = () => {
    if (!address.trim()) {
      showToast("🚨 Please enter a delivery address", "error");
      return;
    }

    const sampleOrder = {
      id: `sample_${Date.now()}`,
      buyerName: "Guest Buyer",
      address,
      status: "Processing",
      items:
        state.items.length > 0
          ? state.items
          : [
              {
                id: 1,
                name: "Premium Basmati Rice",
                price: 180,
                quantity: 25,
                unit: "kg",
              },
            ],
      total: 0,
      paymentId: "SAMPLE_ORDER",
      date: new Date().toLocaleDateString(),
    };

    addOrder(sampleOrder as any);
    dispatch({ type: "CLEAR_CART" });
    showToast("🧺 Sample order placed successfully!", "success");
    navigate("/orders");
  };

  if (state.items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No items to checkout 🛒
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Checkout
        </h1>

        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            Delivery Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your complete delivery address..."
            className="w-full border border-gray-300 rounded-2xl p-3 text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
            rows={3}
          />
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 mb-8 flex justify-between items-center">
          <span className="text-gray-700 text-lg font-medium">Total</span>
          <span className="text-2xl font-semibold text-emerald-700">
            ₹{total.toLocaleString()}
          </span>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleCheckout}
            className="w-full bg-emerald-600 text-white text-lg font-medium py-3 rounded-2xl shadow-md hover:bg-emerald-700 hover:shadow-lg active:scale-[0.98] transition-all duration-200"
          >
            Pay & Place Order
          </button>

          <button
            onClick={handleOrderSamples}
            className="w-full border border-emerald-600 text-emerald-700 text-lg font-medium py-3 rounded-2xl hover:bg-emerald-50 hover:shadow-sm active:scale-[0.98] transition-all duration-200"
          >
            Order Samples
          </button>
        </div>
      </div>
    </div>
  );
}
