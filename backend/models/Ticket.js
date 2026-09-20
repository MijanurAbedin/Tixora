import mongoose from "mongoose";
import Concert from "./Concert.js";

const ticketSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    concert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Concert",
        required: true
    },
    ticketNumber: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["active", "cancelled"],
        default: "active"
    }
},
    {
        timestamps: true
    })

    const Ticket = mongoose.model("Ticket",ticketSchema);

    export default Ticket;