import mongoose from 'mongoose';

const WardSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ward = mongoose.models.Ward || mongoose.model('Ward', WardSchema);

export default Ward;
