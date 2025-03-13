import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Connect from './connectdb.js';
import Event from './models/eventModel.js';
dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // ✅ Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // ✅ Handles form data


// Connect to Database
Connect();

// Test Route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Event Management API!" });
});

// ✅ Create an Event
app.post("/event", async (req, res) => {
    try {
        const { title, description, date, location, price, capacity, organizer } = req.body;
        
        const event = await Event.create({
            title,
            description,
            date,
            location,
            price,
            capacity,
            organizer
        });

        res.status(201).json({ message: "Event Created Successfully", event });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Get All Events
app.get("/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Get a Single Event by ID
app.get("/event/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event Not Found" });
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Update an Event
app.put("/event/:id", async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: "Event Not Found" });

        res.status(200).json({ message: "Event Updated Successfully", updatedEvent });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Delete an Event
app.delete("/event/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: "Event Not Found" });

        res.status(200).json({ message: "Event Deleted Successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
});
