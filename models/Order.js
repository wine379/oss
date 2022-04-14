import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    orderNumber: {
      type: String,
      required: true,
    },
    willPayFullForOSS: {
      type: Boolean,
      required: true,
    },
    paymentOption: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
