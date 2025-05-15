import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 15000, // 15 ثانية لاختيار السيرفر
  connectTimeoutMS: 20000, // 20 ثانية للاتصال
  maxPoolSize: 10,
  retryWrites: true,
  retryReads: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().then((client) => {
      console.log('MongoDB connected successfully in development');
      return client;
    }).catch((err) => {
      console.error('MongoDB connection failed in development:', err.message);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then((client) => {
    console.log('MongoDB connected successfully in production');
    return client;
  }).catch((err) => {
    console.error('MongoDB connection failed in production:', err.message);
    throw err;
  });
}

export default clientPromise;

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    return client;
  } catch (error) {
    console.error('Error in connectToDatabase:', error.message);
    throw error;
  }
}