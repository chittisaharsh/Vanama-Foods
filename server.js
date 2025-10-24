import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Razorpay configuration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RUZAYqUISCIFD4",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "wivyPM4OQiSM3w40k4asVKam",
});

// ✅ Create order endpoint
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

// ✅ Serve the built React frontend (optional, if using same server)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendPath));

// // ✅ Fix for Express 5 wildcard routing
// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(frontendPath, "index.html"));
// });

// ✅ Fix for Express v5 — use regex instead of wildcard string
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});


// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Vanama server running on http://localhost:${PORT}`)
);
