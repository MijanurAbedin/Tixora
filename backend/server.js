import connectDB from './config/db.js';
import app from './app.js';
import "dotenv/config";

const PORT = 4800;

connectDB();

app.listen(PORT,()=>{
    console.log(`Server run on port ${PORT}`)
});