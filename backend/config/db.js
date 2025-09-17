import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    console.log("Attempting to connect to MongoDB...");
    console.log("MongoDB URI:", mongoURI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs

    // For Mongoose 6.0+, minimal options are needed
    await mongoose.connect(mongoURI, {
      dbName: process.env.MONGO_DB_NAME || undefined,
    });
    
    console.log(`Successfully connected to MongoDB 👍`);
    console.log(`Database: ${mongoose.connection.db.databaseName}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error("Full error:", error);
    process.exit(1);
  }
};

export default connectDB;