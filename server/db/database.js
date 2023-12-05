import Mongoose from "mongoose";
import MongoDb from "mongodb";
import { config } from "../config.js";

let db;
// 이름을 recipe로 바꾸기
export async function connectrecipeDB() {
    try {
        const connection = await Mongoose.connect(config.db.host, {
            dbName: "recipe"
        });
        db = connection.connection; // Assign the connection to db
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export function getInformationCollection() {
    return db.collection("all");
}

// auth

export async function connectDB(){
    return MongoDb.MongoClient.connect(config.db.host)
        .then((client) => db = client.db('bob'));
} 

// 관리자 컬렉션
export function system_admins(){
    return db.collection('admin_accounts')
}

// 관리자 공지사항
export function getNotices(){
    return db.collection('notices_board')
}

// collection 을 리턴해주는 함수.

// users
export function getUsers(){
    return db.collection('user_information');
}

// user_recipe
export function getRecipe(){
    return db.collection('user_recipe');
}

// user_meal
export function getMeal(){
    return db.collection('user_meal');
}

// user_health
export function getHealth(){
    return db.collection('user_health');
}
