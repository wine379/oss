import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true, default: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const OrderItem =
  mongoose.models.OrderItem || mongoose.model('OrderItem', orderItemSchema);

export default OrderItem;
