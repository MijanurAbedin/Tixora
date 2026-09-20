import express from 'express';
import { createTicket, getTicketById } from '../controllers/ticketController.js';
import authMiddleware from '../middlewares/auth.js';


const router = express.Router();

router.post("/:bookingId",authMiddleware,createTicket);
router.get("/:ticketId",authMiddleware,getTicketById);
export default router;