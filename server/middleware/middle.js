import * as Repository from '../data/data.js'
import { getSocketIO } from "../connection/socket.js";

export async function getInformation(req, res) {
    try {
        const data = await Repository.getAll();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error getting information:", error);
        res.status(404).json({ error: "Internal Server Error" });
    }
}