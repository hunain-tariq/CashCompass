const express = require('express');
const { signup, login, submitMonthlyPlanner, getMonthlyPlanner, logout, getDashboardData, alreadysaved } = require('../Controller/userController');
const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/monthly-planner', submitMonthlyPlanner);
router.get('/fetch-monthly-planner', getMonthlyPlanner);
router.post('/logout', logout);
router.get('/dashboard-data', getDashboardData);
router.post('/alreadysaved', alreadysaved);

module.exports = router;