import express from 'express';
import { createTicket } from '../controllers/ticketController.js';
import authMiddleware from '../middlewares/auth.js';


const router = express.Router();

router.post("/:bookingId",authMiddleware,createTicket);

export default router;