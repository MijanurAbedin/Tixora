
import Booking from "../models/Booking.js";
import Concert from "../models/Concert.js";


export const createBooking = async (req, res) => {
    try {

        const { seats } = req.body
        const { concertId } = req.params

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



        const totalPrice = concert.price * seats;

        const booking = await Booking.create({
            user: req.userId,
            concert: concert._id,
            seats,
            totalPrice
        })
        concert.availableSeats -= seats;
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

export const getMyBookings = async (req, res) => {

    try {
        const bookings = await Booking.find({
            user: req.userId
        }).populate("concert");

        res.status(200).json({
            message: "My bookings fetched successfully",
            bookings
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const getMyBookingById = async (req, res) => {
    try {

        const booking = await Booking.findById({
            _id: req.params.bookingId,
            user: req.userId
        }).populate("concert");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            })
        }

        res.status(200).json({
            message: "Booking fetched successfully",
            booking
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.bookingId,
            user: req.userId
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking is already cancelled"
            })
        }


        const concert = await Concert.findById(booking.concert);
        if (!concert) {
            return res.status(404).josn({
                message: "Concert not found"
            })
        }
        concert.availableSeats += booking.seats;

        booking.status = "cancelled";
        await booking.save();
        res.status(200).json({
            message: "Booking cancelled successfully",
            booking
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }

}



export const getOrganizerBookings = async (req, res, next) => {
  try {
    const concerts = await Concert.find({
      organizer: req.userId
    }).select("_id");

    const concertIds = concerts.map((concert) => concert._id);

    const bookings = await Booking.find({
      concert: { $in: concertIds }
    }).populate("user, -password").populate("concert");

    res.status(200).json({
      message: "Organizer bookings fetched successfully",
      bookings
    });
  } catch (error) {
    next(error);
  }
}; 

