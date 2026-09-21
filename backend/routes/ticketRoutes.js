import express from 'express';
import { createTicket, getTicketById, validateTicket } from '../controllers/ticketController.js';
import authMiddleware from '../middlewares/auth.js';


const router = express.Router();

router.post("/:bookingId",authMiddleware,createTicket);
router.get("/:ticketId",authMiddleware,getTicketById);
router.get("/validate/:ticketNumber",authMiddleware,validateTicket);
export default router;