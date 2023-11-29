import * as RecipyData from '../data/recipy.js'
import { getSocketIO } from '../connection/socket.js';

export async function getData(req,res){
    const username=req.query.username;
    const data=await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
}
