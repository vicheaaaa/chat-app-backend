import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  mongoose.Promise = global.Promise;
  try {
    console.log('MONGO_DB_URI:', process.env.MONGO_DB_URI); // Add this for debugging
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};

export default connectToMongoDB;
