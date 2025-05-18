import mongoose from 'mongoose';

const connectToMongoose = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 20000,
    });
    console.log('Mongoose connected successfully');
  }
  return mongoose;
};

export { connectToMongoose };