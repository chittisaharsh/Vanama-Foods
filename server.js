import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ Enable CORS for frontend (Vercel)
app.use(
  cors({
    origin: "*", // You can replace * with your Vercel domain for tighter security
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// ✅ Razorpay configuration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RUZAYqUISCIFD4",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "wivyPM4OQiSM3w40k4asVKam",
});

// ✅ Health check route (for Render testing)
app.get("/", (req, res) => {
  res.send("🚀 Vanama backend is running successfully!");
});

// ✅ Create Razorpay order route
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    console.log("✅ Razorpay order created:", order.id);
    res.status(200).json(order);
  } catch (err) {
    console.error("❌ Razorpay Error:", err);
    res.status(500).json({ message: "Error creating order" });
  }
});

// ✅ Serve frontend (optional, for Render fullstack hosting)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "frontend", "dist");

// Only serve if frontend exists
app.use(express.static(frontendPath));

// ✅ Fix for Express v5 — regex-based route for all other paths
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Vanama server running on port ${PORT}`);
});
