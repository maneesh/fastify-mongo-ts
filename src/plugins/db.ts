import fp from 'fastify-plugin';
import mongoose from 'mongoose';

async function connectDB(fastify: any) {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export default fp(connectDB);
