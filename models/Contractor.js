import mongoose from 'mongoose';

const ContractorSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contractor =
  mongoose.models.Contractor || mongoose.model('Contractor', ContractorSchema);

export default Contractor;
