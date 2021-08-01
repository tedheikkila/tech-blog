const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/blog', blogRoutes);

module.exports = router;
