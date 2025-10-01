import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "EcoMarket",             // specify your database here
       // prevents handshake errors
    });

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established successfully.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

export default connectDB;
