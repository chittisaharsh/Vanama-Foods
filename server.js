import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Setup Razorpay with .env variables (fallback to test keys)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RUZAYqUISCIFD4",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "wivyPM4OQiSM3w40k4asVKam",
});

// ✅ API Route to create Razorpay order
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json(order);
  } catch (err) {
    console.error("❌ Razorpay Error:", err);
    res.status(500).json({ message: "Error creating order" });
  }
});

// ✅ Serve Frontend React Build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the built files from frontend/dist
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Fallback to index.html for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/dist", "index.html"));
});

// ✅ Dynamic port (for Render / Railway)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
