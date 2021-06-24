import { Schema, model } from 'mongoose';

const BillDetailSchema = new Schema({
  bill: {
    type: Schema.Types.ObjectId,
    ref: 'bills',
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'items',
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default model('billdetails', BillDetailSchema);
