import mongoose from "mongoose";
const tenantSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
  },
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
  },
  deposit: Number,
  rent: Number,
  totalRent: Number,
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  rentDays: Number,
  isCurrent: Boolean
});

const Tenant =
  mongoose.models.tenants || mongoose.model("tenants", tenantSchema);

export default Tenant;
