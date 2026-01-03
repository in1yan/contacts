import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/database.js";

// Connect to MongoDB with caching
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
