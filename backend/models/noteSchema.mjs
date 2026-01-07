import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

export default mongoose.model("Note", noteSchema);
