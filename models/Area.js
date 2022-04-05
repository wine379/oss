import mongoose from 'mongoose';

const AreaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    incomeLevel: {
      type: String,
      required: true,
    },
    localNames: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Area = mongoose.models.Area || mongoose.model('Area', AreaSchema);

export default Area;
