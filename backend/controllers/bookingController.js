
import Booking from "../models/Booking.js";
import Concert from "../models/Concert.js";


export const createBooking = async (req, res) => {
    try {

        const {seats } = req.body
        const {concertId} = req.params

        const concert = await Concert.findById(concertId);
        if (!concert) {
            return res.status(404).josn({
                message: "Concert not found"
            });
        }

        if (concert.availableSeats < seats) {
            return res.status(400).json({
                message: "Note enough seats avalible"
            });
        }

        if (!seats || seats < 1) {
            return res.status(400).json({
                message: "Invalid seats quantity"
            })
        }

      

const totalPrice = concert.price*seats;

const booking = await  Booking.create({
    user:req.userId,
    concert:concert._id,
    seats,
    totalPrice
})
concert.availableSeats -=seats;
await concert.save();
  res.status(201).json({
            message: "Booking  created successsfully",
            booking

        })



    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

