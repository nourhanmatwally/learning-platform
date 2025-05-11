import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

// التحقق من وجود الـ URI
if (!uri) {
  throw new Error('MONGODB_URI is not defined. Please add it to your environment variables.');
}

// التحقق من صيغة الـ URI
if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
  throw new Error('Invalid MONGODB_URI: URI must start with "mongodb://" or "mongodb+srv://".');
}

// أضيفي السطر ده عشان نشوف الـ URI بالظبط
console.log('MONGODB_URI being used:', uri);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToMongoose() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      bufferCommands: false,
    };
    console.log('Attempting to connect to MongoDB...');
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch((err) => {
      console.error('MongoDB connection failed:', err.message);
      throw new Error(`MongoDB connection failed: ${err.message}`);
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToMongoose;