import express from 'express';
import { adminLogin, isAdminAuth, adminLogout, getAllAdmissions, updateFees, addBook } from '../controller/admin.controller.js';
import { isAuthenticated } from '../middleware/user.auth.js';
import authAdmin from '../middleware/admin.auth.js';

const adminRouter = express.Router();

adminRouter.post("/login" , adminLogin)
adminRouter.get("/is-auth" , authAdmin, isAdminAuth)
adminRouter.post("/logout" , adminLogout)
adminRouter.get("/admissions" , authAdmin , getAllAdmissions)
adminRouter.patch("/update-fee/:id" , authAdmin , updateFees)
adminRouter.post("/add-book" , authAdmin, addBook)

export default adminRouter;