import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import { applyForOrganizer, getMyOrganizerApplication } from '../controllers/organizerController.js';
import uploadOrganizerDocuments from '../middlewares/uploadOrganizerDocuments.js';
const router = express.Router();

router.post("/apply",authMiddleware,uploadOrganizerDocuments.array("documents",5), applyForOrganizer);
router.get("/application",authMiddleware,getMyOrganizerApplication);


export default router;