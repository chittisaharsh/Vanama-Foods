import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Force JSON parsing even if headers aren't perfect
app.use(express.json({ limit: "1mb", type: "application/json" }));
app.use(express.urlencoded({ extended: true }));

// ✅ CORS configuration
app.use(
  cors({
    origin: [
      "https://vanama-food.vercel.app",
      "http://localhost:5173",
      "https://hoppscotch.io",
      "*"
    ],
    methods: ["GET", "POST"],
  })
);

// ✅ Razorpay setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RUZAYqUISCIFD4",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "wivyPM4OQiSM3w40k4asVKam",
});

// ✅ Create Razorpay order
app.post("/create-order", async (req, res) => {
  try {
    console.log("🧾 Raw body:", req.body);

    // Force parse in case body was stringified
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (err) {
        console.error("⚠️ Could not parse string body:", err.message);
      }
    }

    const { amount } = body;
    console.log("💰 Received amount:", amount);

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid or missing amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
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

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Vanama backend is live and accepting orders!");
});

// ✅ Dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
