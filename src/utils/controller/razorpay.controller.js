const Razorpay = require('razorpay');
const crypto = require('crypto');

// 1. Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 2. Create Order Controller
exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit (paise for INR)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Verify Payment Signature Controller
exports.verifyPayment = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Signature matches - Payment is genuine
      return res.json({ success: true, message: "Payment verified successfully", paymentId: razorpay_payment_id });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature, verification failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
