import Concert from "../models/Concert.js";



export const createConcert = async (req, res) => {
    const { title, artist, description, venue, date, time, price, totalSeats } = req.body;

    try {
        const concert = await Concert.create({
            title,
            artist,
            venue,
            description,
            date,
            time,
            price,
            totalSeats,
            availableSeats: totalSeats

        });

        res.status(200).json({
            message: "Event successfully created",
            event: concert
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })

    }

}


export const getAllConcert = async (req, res) => {


    try {

        const concerts = await Concert.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "All Concerts successfully fetched",
            concerts
        })

    }
    catch (error) {
        res.status(500).json({
            message: "Server error"
        })

    }
}

export const getConcertById = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) {
            return res.status(404).json({
                message: "Concert not found"
            });
        }
        res.status(200).json({
            message: "Concet feched successfully",
            concert
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}



export const updateConcertById = async (req, res) => {
    try {
        const concert = await Concert.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!concert) {
            return res.status(404).json({
                message: "Concert not found"
            });
        }

        res.status(200).json({
            message: "Concert updated successffully",
            concert
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(({
            message: "Server Error"
        }))
    }
}


export const deleteConcert = async (req, res) => {
    try {
        const concert = await Concert.findByIdAndDelete(req.params.id);

        if (!concert) {
            return res.status(400).json({
                message: "Concert not found"
            }) 
        };

          res.status(200).json({
                message: "Concert deleted successffully"
                
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error"
        })
    }

}