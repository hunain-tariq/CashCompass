const dns = require('dns')
dns.setServers(["1.1.1.1","8.8.8.8"])
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const userRoutes = require('./Router/userRouter');

const app = express()

//--------------------------- Middleware--------------------------
app.use(cors({
    // origin: 'http://localhost:5173', 
    origin: 'https://cash-compass-jm68dyruy-hunaintariq075-gmailcoms-projects.vercel.app/',  
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

//--------------------------- Routes--------------------------
// app.use('/', userRoutes);
app.get("/", (req, res) => {
  res.send("CashCompass Backend Running 🚀");
});


// ---------------------- Connect to MongoDB-----------------------
mongoose.connect(process.env.MONGO_URI ).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.error('MongoDB connection error:', err)
})


// ------------------------------Liatening port----------------------
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
});