import express from 'express';
import { adminLogin, isAdminAuth, adminLogout, getAllAdmissions, updateFees } from '../controller/admin.controller.js';
import { isAuthenticated } from '../middleware/user.auth.js';

const adminRouter = express.Router();

adminRouter.post("/login" , adminLogin)
adminRouter.get("/is-auth" , isAdminAuth)
adminRouter.post("/logout" , adminLogout)
adminRouter.get("/admissions" , isAuthenticated , getAllAdmissions)
adminRouter.patch("/update-fee/:id" , isAuthenticated , updateFees)

export default adminRouter;