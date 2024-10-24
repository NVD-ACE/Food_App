import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log("MongoDB Connection Successful");
  } catch (error) {
    console.error("MongoDB Connection Failed");
  }
};
export default connectDatabase;