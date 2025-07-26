import express from 'express'
import { getProfile, isAuth, login, logout, register, tekeAdmission } from '../controller/user.controller.js';
import { isAuthenticated } from '../middleware/user.auth.js';

const userRouter =  express.Router();

userRouter.post("/register" , register);
userRouter.post("/login" , login);
userRouter.get("/logout" , logout);
userRouter.get("/is-auth" ,isAuthenticated, isAuth);
userRouter.get("/profile" ,isAuthenticated, getProfile);
userRouter.post("/admission" ,isAuthenticated, tekeAdmission);
// userRouter.post("/fee" ,isAuthenticated, updateFees);


export default userRouter;