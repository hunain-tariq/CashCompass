require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const userRoutes = require('./Router/userRouter');


const app = express()

//--------------------------- Middleware--------------------------
app.use(cors({
    origin: 'http://localhost:5173',   
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

//--------------------------- Routes--------------------------
app.use('/', userRoutes);


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