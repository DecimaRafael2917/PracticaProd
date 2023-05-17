import mongoose from 'mongoose';

export const connectMongo = async () => {
    const client = await mongoose.connect('connection');
    return client;
}