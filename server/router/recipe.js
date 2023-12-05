import express from "express";
import * as recipeController from '../controller/recipe.js';
import * as saveController from '../controller/savedata.js';
import { isAuth } from '../middleware/auth.js';
// import { body } from 'express-validator';
// import { validate } from '../middleware/validator.js'
// import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// recipe/:id?type=rice
// recipe/:id?type=soup
// recipe/:id?type=side
// recipe/:id?type=etc
// recipe/:id?type=my

// 모든 정보 뽑아오기
router.get('/:id', recipeController.getByType);
router.get('/detail/:id', recipeController.getRecipe);

// 내 정보 (내 레시피) 정보 뽑아오기
router.get('/my/category/',isAuth, saveController.getByType); // /?id=국&userid=apple로 창에 검색해야함
router.get('/my/detail/',isAuth, saveController.getRecipe);   // /?id=국&userid=apple로 창에 검색해야함


router.post('/saveData',isAuth,saveController.saveData);
router.delete('/deleteData/',isAuth,saveController.deleteData);    // /?id=국&userid=apple로 창에 검색해야함


export default router;