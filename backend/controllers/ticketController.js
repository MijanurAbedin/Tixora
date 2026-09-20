import crypto from 'crypto';
import Ticket from '../models/Ticket.js';
import Booking from '../models/Booking.js';



export const createTicket = async (req,res,next) => {
    try {
        const {bookingId}  =req.params; 
        
        const booking = await Booking.findById(bookingId);

        

        if(!booking){
            return res.status(404).json({
                message:"Booking note found"
            });
        }
        if(booking.status!=="confirmed"){
            return res.status(400).json({
                message:"Ticket can only be create for a confirmed booking"
            });
        }
         const ticketNumber =`TIX-${crypto.randomBytes(6).toString('hex').toUpperCase()}`

         const ticket = await Ticket.create({
            booking:booking.id,
            user:req.userId,
            concert:booking.concert,
            ticketNumber,
            amount:booking.totalPrice,
            status:"active"
         });
         res.status(201).json({
            message:"Ticket created successully",
            ticket
         })

    } catch (error) {
        console.log(error);
       
        next(error);
    }
}