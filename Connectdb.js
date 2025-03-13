import mongoose from "mongoose";

const Connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:admin@lab-mern-exam.avhan.mongodb.net/eventDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully (Local)");
    } catch (error) {
        console.error("MongoDB Connection Failed", error);
        process.exit(1);
    }
};

export default Connect;
