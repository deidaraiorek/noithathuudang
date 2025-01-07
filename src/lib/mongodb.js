// lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Check if MongoDB URI is defined
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Create cached connection variable
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // If connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,  // Don't buffer commands if not connected
    };

    // Create new connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    // Await the connection
    cached.conn = await cached.promise;
  } catch (e) {
    // If connection fails, clear promise and throw error
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;