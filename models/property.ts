import mongoose from "mongoose";
const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
});

const Property =
  mongoose.models.properties || mongoose.model("properties", propertySchema);

export default Property;
