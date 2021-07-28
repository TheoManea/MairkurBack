const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOK);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Who are you ?';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Oh god, something went wrong ..')
        });
    }

}
};