import mongoose from "mongoose";
import { config } from "../config.js";

let db;

// mongoose.connect('YOUR_MONGODB_URI', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// 데이터베이스 연결
export async function connectsaveDB() {
    try {
        const connection = await mongoose.connect(config.db.host, {
            dbName: "bob"
        });
        db = connection.connection; // Assign the connection to db
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

// save 컬렉션에 있는 데이터를 모두 가져오는 함수
export function getuserecipe() {
    return db.collection("user_recipes");
}