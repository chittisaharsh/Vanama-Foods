import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Allow all origins during testing (use env var for prod safety)
app.use(
  cors({
    origin: [
      "https://vanama-food.vercel.app",
      "http://localhost:5173", // for local Vite testing
      "https://hoppscotch.io",
      "*"
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// ✅ Razorpay Setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RUZAYqUISCIFD4",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "wivyPM4OQiSM3w40k4asVKam",
});

// ✅ API Route — create Razorpay order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    console.log("✅ Razorpay Order Created:", order.id);
    res.json(order);
  } catch (error) {
    console.error("❌ Razorpay Error:", error);
    res.status(500).json({ message: "Error creating Razorpay order" });
  }
});

// ✅ Root route to verify Render is live
app.get("/", (req, res) => {
  res.send("🚀 Vanama backend is live and ready for Razorpay integration!");
});

// ✅ Dynamic PORT (Render requirement)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
