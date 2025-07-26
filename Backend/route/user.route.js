import express from 'express'
import { barrowBook, getProfile, isAuth, login, logout, register, tekeAdmission ,returnBook, myBooks } from '../controller/user.controller.js';
import { isAuthenticated } from '../middleware/user.auth.js';

const userRouter =  express.Router();

userRouter.post("/register" , register);
userRouter.post("/login" , login);
userRouter.get("/logout" , logout);
userRouter.get("/is-auth" ,isAuthenticated, isAuth);
userRouter.get("/profile" ,isAuthenticated, getProfile);
userRouter.post("/admission" ,isAuthenticated, tekeAdmission);
userRouter.post("/barrow/:bookId" , isAuthenticated , barrowBook)
userRouter.post("/return/:bookId" , isAuthenticated , returnBook)
userRouter.get("/my-books" , isAuthenticated , myBooks)

// userRouter.post("/fee" ,isAuthenticated, updateFees);


export default userRouter;