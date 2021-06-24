"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var express_1 = require("express");
var router = express_1.Router();
var argon2_1 = require("argon2");
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../middleware/auth"));
var lodash_1 = __importDefault(require("lodash"));
var User_1 = __importDefault(require("../models/User"));
// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.findById(lodash_1.default.get(req, ['userId'])).select('-password')];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: 'User not found' })];
                res.json({ success: true, user: user });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, hashedPassword, newUser, accessToken, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                // Simple validation
                if (!username || !password)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: 'Missing username and/or password' })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User_1.default.findOne({ username: username })];
            case 2:
                user = _b.sent();
                if (user)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: 'Username already taken' })];
                return [4 /*yield*/, argon2_1.hash(password)];
            case 3:
                hashedPassword = _b.sent();
                newUser = new User_1.default({ username: username, password: hashedPassword });
                return [4 /*yield*/, newUser.save()];
            case 4:
                _b.sent();
                accessToken = jsonwebtoken_1.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET || '');
                res.json({
                    success: true,
                    message: 'User created successfully',
                    accessToken: accessToken,
                });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, passwordValid, accessToken, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                // Simple validation
                if (!username || !password)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: 'Missing username and/or password' })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOne({ username: username })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: 'Incorrect username or password' })];
                return [4 /*yield*/, argon2_1.verify(user.password, password)];
            case 3:
                passwordValid = _b.sent();
                if (!passwordValid)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: 'Incorrect username or password' })];
                accessToken = jsonwebtoken_1.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET || '');
                res.json({
                    success: true,
                    message: 'User logged in successfully',
                    accessToken: accessToken,
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
