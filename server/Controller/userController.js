const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../Model/userModel');


// -----------------------------Signup Controller-----------------------------

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        let salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // console.log(otp)  // For testing purposes, log the OTP to the console otherwise send it via email

        // const hashedotp = await bcrypt.hash(otp, salt);
        // const otpexpiry = Date.now() + 10 * 60 * 1000;

        const newUser = new UserModel({ name, email, password: hashedPassword });

        await newUser.save();

        // const temptoken = jwt.sign({ userid: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
        // res.cookie("Verifytoken", temptoken, { maxAge: 10 * 60 * 1000, httpOnly: true , secure: false, sameSite: "strict" });


        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error)
        
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true , secure: false, sameSite: "strict" });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error)
    }
}

module.exports = { signup, login };