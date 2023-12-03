import { connectDB, getInformationCollection } from "../db/savedata.js";
import Mongoose from "mongoose";


// 테이블 형식
const foodSchema = new Mongoose.Schema({
    userid:String,
    RCP_PARTS_DTLS: String,
    RCP_WAY2: String,
    RCP_SEQ: String,
    INFO_NA: String,
    INFO_WGT: String,
    INFO_PRO: String,
    INFO_FAT: String,
    HASH_TAG: String,
    RCP_PAT2: String,
    RCP_NA_TIP: String,
    INFO_ENG: String,
    RCP_NM: String,
    MANUAL01: String,
    MANUAL02: String,
    MANUAL03: String,
    MANUAL04: String,
    MANUAL05: String,
    MANUAL06: String,
    MANUAL07: String,
    MANUAL08: String,
    MANUAL09: String,
    MANUAL10: String,
    MANUAL11: String,
    MANUAL12: String,
    MANUAL13: String,
    MANUAL14: String,
    MANUAL15: String,
    MANUAL16: String,
    MANUAL17: String,
    MANUAL18: String,
    MANUAL19: String,
    MANUAL20: String,
    MANUAL_IMG01: String,
    MANUAL_IMG02: String,
    MANUAL_IMG03: String,
    MANUAL_IMG04: String,
    MANUAL_IMG05: String,
    MANUAL_IMG06: String,
    MANUAL_IMG07: String,
    MANUAL_IMG08: String,
    MANUAL_IMG09: String,
    MANUAL_IMG10: String,
    MANUAL_IMG11: String,
    MANUAL_IMG12: String,
    MANUAL_IMG13: String,
    MANUAL_IMG14: String,
    MANUAL_IMG15: String,
    MANUAL_IMG16: String,
    MANUAL_IMG17: String,
    MANUAL_IMG18: String,
    MANUAL_IMG19: String,
    MANUAL_IMG20: String,
    ATT_FILE_NO_MK: String,
    ATT_FILE_NO_MAIN: String,
});

const Recipe = Mongoose.model('sugar', foodSchema);


// Function to get data by user ID
export async function getByUserid(userId) {
    try {
        await connectDB();
        const informationCollection = getInformationCollection();
        const data = await informationCollection.find({ userId: userId }).toArray();
        return data;
    } catch (error) {
        console.error("Error querying information:", error);
        throw error;
    } finally {
        Mongoose.connection.close();
    }
}



// export async function insertSugar(id, date, sugarData, text) {
//     try {
//         const sugarCollection = getCollection('sugar');
//         console.log('Connected to the table:', sugarCollection.collectionName);

//         const savedData = new Sugar({
//             userId: id,
//             date: date,
//             sugarData: sugarData,
//             notepad: text
//         }).save();

//         return savedData;
//     } catch (error) {
//         console.error('Error connecting to the database:', error.message);
//         throw error;
//     }
// }