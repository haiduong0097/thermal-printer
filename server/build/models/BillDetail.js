"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BillDetailSchema = new mongoose_1.Schema({
    bill: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'bills',
    },
    item: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'items',
    },
    amount: {
        type: Number,
        required: true,
    },
});
exports.default = mongoose_1.model('billdetails', BillDetailSchema);
