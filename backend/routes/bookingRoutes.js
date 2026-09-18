import express from 'express'
import { cancelBooking, createBooking, getMyBookingById, getMyBookings, getOrganizerBookings } from '../controllers/bookingController.js';
import authMiddleware from '../middlewares/auth.js';
import roleMiddleware from '../middlewares/role.js';
const router =  express.Router();


router.post("/:concertId",authMiddleware,createBooking);
router.get("/my",authMiddleware,getMyBookings)
router.get("/organizer",authMiddleware,roleMiddleware("organizer"),getOrganizerBookings);
router.get("/:bookingId",authMiddleware,getMyBookingById);
router.put("/:bookingId/cancel",authMiddleware,cancelBooking);


export default router;

