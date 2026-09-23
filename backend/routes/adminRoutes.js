import express  from 'express';
import authMiddleware from "../middlewares/auth.js"
import roleMiddleware from "../middlewares/role.js"
import { getPendingApplication, updateApplicationStatus } from '../controllers/adminController.js';


const  router = express.Router();


router.get("/pending-applications",authMiddleware,roleMiddleware(["superadmin"]),getPendingApplication);
router.patch("/applications/:id/status",authMiddleware,roleMiddleware(["superadmin"]),updateApplicationStatus);
export default router ; 