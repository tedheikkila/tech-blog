const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const blogRoutes = require('./blogRoutes');

// 3 routes (users, dashboard, blog); remember singular/plural matters
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/blog', blogRoutes);

module.exports = router;
