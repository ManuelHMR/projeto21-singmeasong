import { Request, Response } from "express";
import { clearService } from "./../services/testService.js";

export async function clearController(req: Request, res: Response) {
    await clearService();
    res.sendStatus(200);
};