import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToMongoose() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('Mongoose connected successfully');
      return mongoose;
    }).catch((err) => {
      console.error('Mongoose connection failed:', err);
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToMongoose;