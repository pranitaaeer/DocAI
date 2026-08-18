import mongoose from "mongoose";

const DBConnect = async (): Promise<void> => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI as string, { 
            dbName: process.env.DBNAME 
        });
        console.log(`Database connected successfully to host: ${db.connections[0].host}`);
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
};

export default DBConnect;