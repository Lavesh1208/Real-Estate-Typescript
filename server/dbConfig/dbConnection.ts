require('dotenv').config();
import mongoose from 'mongoose';

const dbUrl: string = process.env.MONGODB_URI || '';

export const dbConnection = async () => {
   try {
      const connection = await mongoose.connect(dbUrl);

      console.log('MongoDB Connected...');
   } catch (error: any) {
      console.log(`MongoDB Error: ${error.message}`);
   }
};
