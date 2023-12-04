import * as RecipeRepository from '../data/recipe.js'
import { getSocketIO } from '../connection/socket.js';

export async function getByType(req,res){
    try {
        const categoryId = req.params.id;
        // console.log(categoryId);
        const filteredData = await filterDataByCategory(categoryId);
        res.status(200).json(filteredData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '1.Internal Server Error' });
    }
}

export async function getRecipe(req, res) {
    try {
        const ingredientID = req.params.id;
        // console.log(ingredientID);
        const data = await RecipeRepository.getAll();
        const oneEffect = data.filter((item) => item.RCP_NM.trim() == ingredientID);
        // console.log(oneEffect);
        res.status(200).json(oneEffect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '2.Internal Server Error' });
    }
}

export async function filterDataByCategory(categoryId) {
    const data = await RecipeRepository.getAll();
    return data.filter(item => item.RCP_PAT2 === categoryId);
}

// export async function filterDataByCategory(categoryId) {
//     // 카테고리에 따라 데이터 필터링
//     const data = await RecipeRepository.getAll();
//     return data.filter(item => item.category === categoryId);
// }