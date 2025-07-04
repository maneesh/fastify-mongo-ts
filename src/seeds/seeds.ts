import mongoose from 'mongoose';
import dotenv from 'dotenv';
import StaticContent from '../models/StaticData';
import { User } from '../models/User';

dotenv.config();

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    // Clear previous data
    await User.deleteMany();
    await StaticContent.deleteMany();
    console.log('🗑️ Cleared old data');

    // Seed Users
    const users = await User.insertMany([
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ]);

    console.log(`✅ Inserted ${users.length} users`);

    // Seed Static Content
    const staticContents = await StaticContent.create({
      domain: 'example.com',
      page: 'home',
      sections: [
        {
          name: 'Hero Section',
          contents: [
            { type: 'text', data: 'Welcome to our website!' },
            { type: 'image', data: '/images/banner.png' },
          ],
        },
        {
          name: 'About Section',
          contents: [
            { type: 'text', data: 'We are a tech company.' },
            { type: 'video', data: '/videos/about.mp4' },
          ],
        },
      ],
    });

    console.log('✅ Inserted static content');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
