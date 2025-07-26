import express from 'express';
import { adminLogin, isAdminAuth, adminLogout, getAllAdmissions, updateFees, addBook } from '../controller/admin.controller.js';
import { isAuthenticated } from '../middleware/user.auth.js';

const adminRouter = express.Router();

adminRouter.post("/login" , adminLogin)
adminRouter.get("/is-auth" , isAdminAuth)
adminRouter.post("/logout" , adminLogout)
adminRouter.get("/admissions" , isAuthenticated , getAllAdmissions)
adminRouter.patch("/update-fee/:id" , isAuthenticated , updateFees)
adminRouter.post("/add-book" , isAuthenticated, addBook)

export default adminRouter;