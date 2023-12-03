import * as RecipeRepository from '../data/savedata.js'
import { getSocketIO } from '../connection/socket.js';

// fetch하는 함수

export async function getByType(req,res){
    try {
        const categoryId = req.query.id;
        const userId = req.query.userid;
        console.log(categoryId, userId);
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
        const userId = req.query.userid;
        console.log(categoryId, userId);
        const data = await RecipeRepository.getByUserid(userId);
        const oneEffect = data.filter((item) => item.RCP_NM.trim() == ingredientID);
        console.log(oneEffect);
        res.status(200).json(oneEffect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '2.Internal Server Error' });
    }
}

export async function filterDataByCategory(categoryId, userId) {
    const data = await RecipeRepository.getByUserid(userId);
    return data.filter(item => item.RCP_PAT2 === categoryId);
}