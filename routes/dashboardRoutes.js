const express = require('express');
const router = express.Router();
const { verifyToken, requireJwtAdmin } = require('../middleware/jwtAuth');

router.get('/dashboard', verifyToken, requireJwtAdmin, (req, res) => {
    res.render('dashboard', {
        pageTitle: 'Admin Dashboard',
        username: req.user?.userId || 'Admin'
    });
});

module.exports = router;
