"use strict";
var jwt = require('jsonwebtoken');
var verifyToken = function (req, res, next) {
    var authHeader = req.header('Authorization');
    var token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' });
    try {
        var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};
module.exports = verifyToken;
