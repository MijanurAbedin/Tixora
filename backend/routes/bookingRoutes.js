import express from 'express'
import { createBooking } from '../controllers/bookingController.js';
import authMiddleware from '../middlewares/auth.js';
const router =  express.Router();


router.post("/:concertId",authMiddleware,createBooking);



export default router;

