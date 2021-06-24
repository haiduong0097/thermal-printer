"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var jsonwebtoken_1 = require("jsonwebtoken");
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
var verifyToken = function (req, res, next) {
    var authHeader = req.header('Authorization');
    var token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' });
    try {
        var decoded = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};
exports.default = verifyToken;
