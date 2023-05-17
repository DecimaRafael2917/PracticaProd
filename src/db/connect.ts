import mongoose from 'mongoose';

export const connectMongo = async () => {
    const client = await mongoose.connect('mongodb+srv://Cluster61080:Q2lZTlNWTntS@cluster61080.jwi2wpr.mongodb.net/product-api?retryWrites=true&w=majority');
    return client;
}