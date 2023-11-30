import * as RecipeRepository from '../data/recipe.js'
import { getSocketIO } from '../connection/socket.js';

const allData = await RecipeRepository.fetch_data();

export async function getByType(req,res){
    try {
        const categoryId = req.params.id;
        console.log(categoryId);
        const filteredData = filterDataByCategory(allData, categoryId);
        res.status(200).json(filteredData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '1.Internal Server Error' });
    }
}

export async function getRecipe(req, res) {
    try {
        const ingredientID = req.params.id;
        console.log(ingredientID);
        const oneEffect = allData.COOKRCP01.row.filter((item) => item.PRDLST_NM.trim() == ingredientID);
        console.log(oneEffect);
        res.status(200).json(oneEffect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '2.Internal Server Error' });
    }
}

function filterDataByCategory(data, categoryId) {
    const filteredData = [];
    for (const item of data.COOKRCP01.row) {
        if (item.RCP_PAT2.includes(categoryId)) {
            filteredData.push(item);
        }
    }
    return filteredData;
}
