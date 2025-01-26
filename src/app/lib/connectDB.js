import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log('Using existing database connection');
      console.log('Connected to database:', mongoose.connection.db.databaseName);
      console.log('Host:', mongoose.connection.host);
      return;
    }

    console.log('Creating new database connection to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected successfully to:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export default dbConnect;

