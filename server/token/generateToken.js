const jwt = require('jsonwebtoken');

const generateToken = async (res, id, name, email, next) => {
    
    let verify;
    
    const token = jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
        expiresIn: 37000000,
    });
    res.cookie('token', token, {
        expires: new Date(Date.now() + 5656000),
        secure: false,
        httpOnly: true,
        sameSite: true, //this seemed to fix the issue of no cookies set on first request for postman
    });
    
    try {
        if (!token) {
            console.log("no token");
            return res.status(401).json('Invalid token');
        }
        verify = jwt.verify(token, process.env.JWT_SECRET);
        console.log("successful verification");
        return verify;
        return next();
    } catch (err) {
        res.status(500).json(err.toString());
    }
};

module.exports = generateToken;
