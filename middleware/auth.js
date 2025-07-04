function requireLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login'); 
    }
}

function requireAdmin(req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.status(403).send("Access Denied");
    }
}

module.exports = { requireLogin, requireAdmin };
