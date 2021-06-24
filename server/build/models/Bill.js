"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var constant_1 = require("../common/constant");
var BillSchema = new mongoose_1.Schema({
    billcode: {
        type: String,
        required: true,
    },
    position: {
        type: String,
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'stores',
    },
    cashier: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: [constant_1.STATUS_BILL.NEW_CREATE, constant_1.STATUS_BILL.PRINTED],
    },
});
exports.default = mongoose_1.model('bills', BillSchema);
