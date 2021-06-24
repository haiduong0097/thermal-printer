import { Schema, model } from 'mongoose';

const ItemSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'stores',
  },
});

export default model('items', ItemSchema);
