import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Disable buffering for serverless environments
mongoose.set("bufferCommands", false);

// Global cache for MongoDB connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // Return existing connection if available
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  // Return existing promise if connection is in progress
  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
      connectTimeoutMS: 30000, // 30 seconds connection timeout
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 2, // Minimum number of connections in the pool
      retryWrites: true, // Retry writes on failure
      retryReads: true, // Retry reads on failure
      bufferCommands: false, // Disable buffering
    };

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => {
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }

  // Handle connection events
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    cached.conn = null;
    cached.promise = null;
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
    cached.conn = null;
    cached.promise = null;
  });

  return cached.conn;
};

export default connectDB;
