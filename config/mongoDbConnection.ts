import mongoose from "mongoose";


const MONGO_URI = process.env.CONNECTION_STRING!;

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`Database connected: ${conn.connection.host}`);
    console.log(`Database name: ${conn.connection.name}`);
  } catch (error) {
    console.error(" Error connecting to MongoDB:", (error as Error).message);
    process.exit(1); // Exit the process if unable to connect
  }
};
