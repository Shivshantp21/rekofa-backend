import mongoose from "mongoose";

export default async function dbConnect() {
    try {
        console.log("DATABASE_URL:", process.env.URL);
        const DB_OPTIONS = {
            dbName: process.env.DBNAME,
            authSource: process.env.DBAUTHSOURCE,
        };
        const connection = await mongoose.connect(process.env.URL, DB_OPTIONS);
        console.log("✅ Database connected successfully");

        return connection;
    } catch (error) {
        console.error("❌ Error connecting to database:", error.message);
        console.error("Error details:", error);
        process.exit(1); // Exit process with failure
    }
}
