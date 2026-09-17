import express from 'express'
import { createConcert, deleteConcert, getAllConcert, getConcertById, updateConcertById } from '../controllers/concertController.js';
import authMiddleware from '../middlewares/auth.js';
import roleMiddleware from '../middlewares/role.js';
const router = express.Router();

router.post("/",authMiddleware,roleMiddleware("organizer","superadmin"),createConcert);
router.get("/",getAllConcert);
router.get("/:id",getConcertById)
router.put("/:id",roleMiddleware("organizer","superadmin"),updateConcertById);
router.delete("/:id",roleMiddleware("organizer","superadmin"),deleteConcert);

export default router;
