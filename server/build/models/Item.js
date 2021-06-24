"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ItemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    isTopping: {
        type: Boolean,
        default: false,
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'stores',
    },
});
exports.default = mongoose_1.model('items', ItemSchema);
