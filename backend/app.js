import express from 'express';
import authRoutes from './routes/authRoutes.js';
import concertRoutes from './routes/ConcertRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import organizerRoutes from './routes/organizerRoutes.js'

const app = express();

app.use(express.json());



app.use('/api/auth',authRoutes);
app.use('/api/concert',concertRoutes);
app.use('/api/booking',bookingRoutes);
app.use('/api/payments',paymentRoutes);
app.use("/api/tickets",ticketRoutes);
app.use("/api/organizer",organizerRoutes);
export default app;