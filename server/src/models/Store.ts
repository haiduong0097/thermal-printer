import { TYPE_BILL } from '../common/constant';
import { Schema, model } from 'mongoose';

const StoreSchema = new Schema({
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
    enum: [TYPE_BILL.SIZE_58, TYPE_BILL.SIZE_80],
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

export default model('stores', StoreSchema);
