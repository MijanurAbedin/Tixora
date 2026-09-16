import express from 'express'
import { createConcert, deleteConcert, getAllConcert, getConcertById, updateConcertById } from '../controllers/concertController.js';
import authMiddleware from '../middlewares/auth.js';
const router = express.Router();

router.post("/",authMiddleware,createConcert);
router.get("/",getAllConcert);
router.get("/:id",getConcertById)
router.put("/:id",updateConcertById);
router.delete("/:id",deleteConcert);

export default router;
