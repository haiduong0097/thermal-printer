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
var lodash_1 = __importDefault(require("lodash"));
var constant_1 = require("../common/constant");
var auth_1 = __importDefault(require("../middleware/auth"));
var Bill_1 = __importDefault(require("../models/Bill"));
var BillDetail_1 = __importDefault(require("../models/BillDetail"));
var router = express_1.Router();
// @route GET api/bill
// @desc Get all bill by user
// @access Private
router.get('/', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bills, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Bill_1.default.find({ user: lodash_1.default.get(req, ['userId']) })];
            case 1:
                bills = _a.sent();
                return [2 /*return*/, res.json({ success: true, bills: bills })];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route GET api/bill
// @desc Get detail bill of user by store and bill
// @access Private
router.get('/:store/:bill', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bill, billDetails, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Bill_1.default.findOne({
                        _id: req.params.bill,
                        user: lodash_1.default.get(req, ['userId']),
                        store: req.params.store,
                    })];
            case 1:
                bill = _a.sent();
                return [4 /*yield*/, BillDetail_1.default.find({ bill: bill })
                        .populate('item', ['usenamername', 'price', 'isTopping'])
                        .select('amount')];
            case 2:
                billDetails = _a.sent();
                return [2 /*return*/, res.json({ success: true, bill: bill, billDetails: billDetails })];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route POST api/bill/:store
// @desc Create bill by user and store
// @access Private
router.post('/:store', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, billcode, position, checkIn, checkOut, cashier, billDetails, user, status, billCheckCondition, billCheck, newBill, newBillDetails, i, newBillDetail, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, billcode = _a.billcode, position = _a.position, checkIn = _a.checkIn, checkOut = _a.checkOut, cashier = _a.cashier, billDetails = _a.billDetails;
                user = lodash_1.default.get(req, ['userId']);
                status = constant_1.STATUS_BILL.NEW_CREATE;
                if (!billcode)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: 'Billcode is required' })];
                if (!billDetails || billDetails.length === 0)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: 'Billcode is required' })];
                billCheckCondition = { billcode: billcode, user: user };
                return [4 /*yield*/, Bill_1.default.findOne(billCheckCondition)];
            case 1:
                billCheck = _b.sent();
                if (billCheck)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: 'Bill code for user already taken' })];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, , 9]);
                newBill = new Bill_1.default({
                    billcode: billcode,
                    position: position,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    user: user,
                    cashier: cashier,
                    status: status,
                    store: req.params.store,
                });
                return [4 /*yield*/, newBill.save()];
            case 3:
                _b.sent();
                newBillDetails = [];
                if (!(billDetails && billDetails.length > 0)) return [3 /*break*/, 7];
                i = 0;
                _b.label = 4;
            case 4:
                if (!(i < billDetails.length)) return [3 /*break*/, 7];
                newBillDetail = new BillDetail_1.default({
                    bill: newBill._id,
                    item: billDetails[i].item,
                    amount: billDetails[i].amount,
                });
                return [4 /*yield*/, newBillDetail.save()];
            case 5:
                _b.sent();
                newBillDetails[i] = newBillDetail;
                _b.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7: return [2 /*return*/, res.json({
                    success: true,
                    message: 'Congratulations! Create bill successfuly.',
                    newBill: newBill,
                    newBillDetails: newBillDetails,
                })];
            case 8:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
