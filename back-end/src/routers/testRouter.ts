import { Router } from "express";
import { clearController } from "../controllers/testController.js";

const testRouter = Router();

testRouter.post("/clear", clearController);

export default testRouter;