import { connectrecipeDB, getInformationCollection } from "../db/database.js";
import Mongoose from "mongoose";


export async function getAll() {
    try {
        await connectrecipeDB(); 

        const informationCollection = getInformationCollection();

        const data = await informationCollection.find().toArray();
        return data;
    } catch (error) {
        console.error("Error querying information:", error);
        throw error; // Rethrow the error to be handled by the calling code
    } finally {
        Mongoose.connection.close();
    }
}