import { Schema, model } from 'mongoose';
import { STATUS_BILL } from '../common/constant';

const BillSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  store: {
    type: Schema.Types.ObjectId,
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
    enum: [STATUS_BILL.NEW_CREATE, STATUS_BILL.PRINTED],
  },
});

export default model('bills', BillSchema);
