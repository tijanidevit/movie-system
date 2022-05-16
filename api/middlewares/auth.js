const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'secret');
        req.token_data = decodedToken;
        next();
    } catch (e) {
        return res.status(401).json({
            'message': "Please try login in again!",
            'error': e
        });
    }
}

module.exports = {
    auth: auth
}