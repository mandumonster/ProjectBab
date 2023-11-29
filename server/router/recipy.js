import express from "express";
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';
import * as Controller from '../controller/recipy.js';
import {isAuth} from '../middleware/auth.js';

const router=express.Router();

router.get('/',Controller.getData);

export default router;