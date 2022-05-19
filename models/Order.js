import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isDelivered: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
