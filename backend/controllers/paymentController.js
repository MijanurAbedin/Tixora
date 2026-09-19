import crypto from 'crypto';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';


export const CreatePaymentOrder = async (req, res, next) => {
   
    try {
        
      const {bookingId} = req.params;
        const booking = await Booking.findOne({
            _id: bookingId,
            user:req.userId
        })
     

       
        if (!booking){
            return res.status(404).json({
                message: "Booking not found"
            })
        }
        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Cannot pay for a cancelled booking"
            })
        }
        const orderId = `order_${crypto.randomBytes(8).toString("hex")}`;


        const payment = await Payment.create({
            booking: bookingId,
            user: req.userId,
            amount: booking.totalPrice,
            provider: "mock",
            orderId,
            status: "pending"
        })

        res.status(201).json({
            message: "Payment order created successfully",
            order: {
                id: orderId,
                amount: booking.totalPrice,
                currency: "INR"
            },
            payment
        })

    } catch (error) {
console.log(error);
next(error);
    }

}

export const mockPaymentSuccess = async (req,res,next)=>{

    try{
        const {paymentId} =req.params;
        const payment  = await Payment.findOne({
            _id:paymentId,
            user:req.userId
        })
        if(!payment){
            return res.status(404).json({
                message:"Payment not found"
            })
        }
        if(payment.status==="paid"){
            return res.status(400).json({
                message:"Payment already completed"
            })
        }

        const booking  = await Booking.findOne({
            _id:payment.booking,
            user:req.userId
        });

        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            })
        }
        const mockPaymentId = `pay_${crypto.randomBytes(8).toString("hex")}`

        payment.paymentId = mockPaymentId;
        payment.status = "paid";
        await payment.save();
        booking.status = "confirmed";
        await booking.save();

        res.status(200).json({
            message:"Mock payment successfully",
            payment,
            booking
        })
    }catch(error){
        console.log(error);
        next(error);
    }
};