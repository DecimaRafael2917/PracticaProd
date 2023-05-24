require('dotenv').config({ path: '.env' })
import mongoose from 'mongoose';

export let client: mongoose.Mongoose;

export const connectMongo = async () => {
    client = await mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.HOST_DB}?retryWrites=true&w=majority`);
    return client;
}