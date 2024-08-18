import mongoose from "mongoose";
const propertySchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
});

const Property =
  mongoose.models.properties || mongoose.model("properties", propertySchema);

export default Property;
