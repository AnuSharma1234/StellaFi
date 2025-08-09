import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const authRouter = Router()

authRouter.post('/create',createUser)

export default authRouter