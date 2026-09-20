import crypto from 'crypto';
import QRCode from 'qrcode';
import Ticket from '../models/Ticket.js';
import Booking from '../models/Booking.js';



export const createTicket = async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findOne({
            _id:bookingId,
            user:req.userId
        })



        if (!booking) {
            return res.status(404).json({
                message: "Booking note found"
            });
        }
        if (booking.status !== "confirmed") {
            return res.status(400).json({
                message: "Ticket can only be create for a confirmed booking"
            });
        }
        const ticketNumber = `TIX-${crypto.randomBytes(6).toString('hex').toUpperCase()}`
        const qrData = JSON.stringify({
            ticketNumber,
            bookingId: booking._id.toString(),
            userId: req.userId
        })
        const qrcode = await QRCode.toDataURL(qrData);

        const ticket = await Ticket.create({
            booking: booking.id,
            user: req.userId,
            concert: booking.concert,
            ticketNumber,
            amount: booking.totalPrice,
            status: "active",
            qrcode
        });
        res.status(201).json({
            message: "Ticket created successully",
            ticket
        })

    } catch (error) {
        console.log(error);

        next(error);
    }
}



export const getTicketById = async (req, res, next) => {
    try {
        const { ticketId } = req.params;
        const ticket = await Ticket.findOne({
            _id: ticketId,
            user: req.userId
        })

        if(!ticket){
            return res.status(404).json({
                message:"Ticket not found"
            })
        }
        res.status(200).json({
            message:"Ticket fetched successfully",
            ticket
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}