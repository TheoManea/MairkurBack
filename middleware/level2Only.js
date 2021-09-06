module.exports = (req, res, next) => {
    // need to be lvl 2 admin to manage assos
    if (req.levelAccess !== 2) {
        return res.status(400).send("Access denied, sorry bro");
    }
    next();
};