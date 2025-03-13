import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["Credit Card", "PayPal", "Stripe"], required: true },
    status: { type: String, enum: ["success", "failed", "pending"], default: "pending" }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
