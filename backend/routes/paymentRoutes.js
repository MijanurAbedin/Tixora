import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { CreatePaymentOrder, mockPaymentSuccess } from '../controllers/paymentController.js';



const router = express.Router();

router.post("/:bookingId",authMiddleware,CreatePaymentOrder);
router.post("/mock-success/:paymentId",authMiddleware,mockPaymentSuccess);

export default router;
