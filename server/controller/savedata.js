import * as RecipeRepository from '../data/savedata.js'
import { getSocketIO } from '../connection/socket.js';

// fetch하는 함수

export async function getByType(req,res){
    try {
        const categoryId = req.query.id;
        const userId = req.id;
        // console.log(userId, categoryId)
        const filteredData = await filterDataByCategory(categoryId, userId);
        res.status(200).json(filteredData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '1.Internal Server Error' });
    }
}

export async function getRecipe(req, res) {
    try {
        const categoryId = req.query.id;
        const userId = req.id;
        console.log(categoryId, userId);
        const data = await RecipeRepository.getByUserid(userId);
        const oneEffect = data.filter((item) => item.RCP_NM.trim() == categoryId);
        // console.log(oneEffect);
        res.status(200).json(oneEffect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '2.Internal Server Error' });
    }
}

export async function filterDataByCategory(categoryId, userId) {
    // console.log(userId)
    const data = await RecipeRepository.getByUserid(userId);
    return data.filter(item => item.RCP_PAT2 === categoryId);
}


// router.post('/saveData',saveController.saveData);
// router.delete('/deleteData',saveController.deleteData);


export async function saveData(req, res){
    const { RCP_PARTS_DTLS,RCP_WAY2,RCP_SEQ,INFO_NA,INFO_WGT,
        INFO_PRO,INFO_FAT,HASH_TAG,RCP_PAT2,RCP_NA_TIP,INFO_ENG,RCP_NM,MANUAL01,MANUAL02,MANUAL03,MANUAL04,MANUAL05,MANUAL06,MANUAL07,MANUAL08,MANUAL09,MANUAL10,MANUAL11,MANUAL12,MANUAL13,MANUAL14,MANUAL15,MANUAL16,MANUAL17,MANUAL18,MANUAL19,MANUAL20,MANUAL_IMG01,MANUAL_IMG02,MANUAL_IMG03,MANUAL_IMG04,MANUAL_IMG05,MANUAL_IMG06,MANUAL_IMG07,MANUAL_IMG08,MANUAL_IMG09,MANUAL_IMG10,MANUAL_IMG11,MANUAL_IMG12,MANUAL_IMG13,MANUAL_IMG14,MANUAL_IMG15,MANUAL_IMG16,MANUAL_IMG17,MANUAL_IMG18,MANUAL_IMG19,MANUAL_IMG20,ATT_FILE_NO_MK,ATT_FILE_NO_MAIN } = req.body;
    const userid = req.id;
    // console.log(userid)

    try {
        await RecipeRepository.saveData(
            userid,
            RCP_PARTS_DTLS,
            RCP_WAY2,
            RCP_SEQ,
            INFO_NA,
            INFO_WGT,
            INFO_PRO,
            INFO_FAT,
            HASH_TAG,
            RCP_PAT2,
            RCP_NA_TIP,
            INFO_ENG,
            RCP_NM,
            MANUAL01,
            MANUAL02,
            MANUAL03,
            MANUAL04,
            MANUAL05,
            MANUAL06,
            MANUAL07,
            MANUAL08,
            MANUAL09,
            MANUAL10,
            MANUAL11,
            MANUAL12,
            MANUAL13,
            MANUAL14,
            MANUAL15,
            MANUAL16,
            MANUAL17,
            MANUAL18,
            MANUAL19,
            MANUAL20,
            MANUAL_IMG01,
            MANUAL_IMG02,
            MANUAL_IMG03,
            MANUAL_IMG04,
            MANUAL_IMG05,
            MANUAL_IMG06,
            MANUAL_IMG07,
            MANUAL_IMG08,
            MANUAL_IMG09,
            MANUAL_IMG10,
            MANUAL_IMG11,
            MANUAL_IMG12,
            MANUAL_IMG13,
            MANUAL_IMG14,
            MANUAL_IMG15,
            MANUAL_IMG16,
            MANUAL_IMG17,
            MANUAL_IMG18,
            MANUAL_IMG19,
            MANUAL_IMG20,
            ATT_FILE_NO_MK,
            ATT_FILE_NO_MAIN);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export async function deleteData(req, res){
    const id = req.id;
    const rcpname=req.query.id;

    try {
        await RecipeRepository.deleteData(id,rcpname);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}