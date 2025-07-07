import mongoose from 'mongoose';

const dbUrl: string = process.env.DB_URL || 'mongodb://127.0.0.1:27017/imagine';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(dbUrl);

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => console.log('✅ Database connected'));
    } catch (error: any) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectDB;