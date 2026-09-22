import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import { applyForOrganizer, getMyOrganizerApplication } from '../controllers/organizerController.js';

const router = express.Router();

router.post("/apply",authMiddleware,applyForOrganizer);
router.get("/application",authMiddleware,getMyOrganizerApplication);


export default router;