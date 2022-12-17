import mongoose, { Schema } from "mongoose";

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "finished"],
    message: "{VALUE} is not an allowed state",
    default: "pending",
    required: true,
  },
});

const EntryModel =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
