import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    console.log('MONGO_DB_URI:', process.env.MONGO_DB_URI); // Debugging the MongoDB URI
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true, // These options might not be necessary in newer Mongoose versions
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message, error.stack);
    process.exit(1); // Exit the process if connection fails
  }
};

// Optional: Gracefully close the MongoDB connection when the application exits
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});

export default connectToMongoDB;
