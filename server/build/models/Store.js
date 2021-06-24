"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../common/constant");
var mongoose_1 = require("mongoose");
var StoreSchema = new mongoose_1.Schema({
    storeCode: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    storeTypeBill: {
        type: String,
        required: true,
        enum: [constant_1.TYPE_BILL.SIZE_58, constant_1.TYPE_BILL.SIZE_80],
    },
    storeAddress: {
        type: String,
        required: true,
    },
    storePhoneNumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    storeImageUrl: {
        type: String,
    },
});
exports.default = mongoose_1.model('stores', StoreSchema);
