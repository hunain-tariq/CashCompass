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
    console.log("hello") // This line is not valid in a Node.js environment and should be removed
    try {
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.cookie("token", token, { maxAge: 24 *60 * 60 * 1000, httpOnly: true , secure: false, sameSite: "strict" });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error)
    }
}


const submitMonthlyPlanner = async (req, res) => {
    const { month, income, expense, savings } = req.body;

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.userid;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const monthExists = user.months.find(
            (m) => m.month.toLowerCase() === month.toLowerCase()
        );

    if (monthExists) {
      return res.status(400).json({ message: "Month already added" });
    }
        user.months.push({
            month,
            totalIncome: income,
            totalExpense: expense,
            savings
        });

        await user.save();


        res.status(200).json({ message: "Monthly record added successfully" });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getMonthlyPlanner = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userid;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the months array
         const monthOrder = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];

    const sortedMonths = user.months.sort((a, b) => {
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });
        res.status(200).json(sortedMonths);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

const getDashboardData = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userid;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const months = user.months || [];

        // Aggregate totals
        const totalIncome = months.reduce((sum, m) => sum + Number(m.totalIncome), 0);
        const totalExpense = months.reduce((sum, m) => sum + Number(m.totalExpense), 0);
        const savings = months.reduce((sum, m) => sum + Number(m.savings), 0);
        const totalSavings = user.aleadySaved + savings ;
        const balance = totalIncome - totalExpense - savings;

        res.status(200).json({
            totalIncome,
            totalExpense,
            savings,
            totalSavings,
            balance,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const alreadysaved = async (req, res) => {
    const { aleadySaved } = req.body;
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userid;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.aleadySaved =  user.aleadySaved = Number(user.aleadySaved || 0) + Number(aleadySaved);;
        await user.save();
        res.status(200).json({ message: "Savings updated successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};  




module.exports = { signup, login, submitMonthlyPlanner, getMonthlyPlanner , logout, getDashboardData, alreadysaved };