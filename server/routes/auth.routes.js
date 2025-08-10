import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";

const authRouter = Router()

authRouter.post('/create',createUser)

export default authRouter
