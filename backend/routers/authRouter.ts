//create a simple router for me
import { Router } from "express";
import { register, login } from "../controllers/authController";
import { jwtAuth } from "../middleware/jwtAuth";
const authRouter = Router();

authRouter.post("/register",register);
authRouter.post("/login",login);

export default authRouter;