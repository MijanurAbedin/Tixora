import express from 'express';
import authRoutes from './routes/authRoutes.js';
// import concertRoutes from './routes/ConcertRoutes.js'
const app = express();

app.use(express.json());



app.use('/api/auth',authRoutes);
// app.use('/api/concert',concertRoutes)


export default app;