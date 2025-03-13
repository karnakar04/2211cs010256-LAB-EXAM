import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    price: { type: Number, default: 0 },
    capacity: { type: Number, required: true },
    ticketsSold: { type: Number, default: 0 },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema); // ✅ Using eventSchema here
export default Event;
