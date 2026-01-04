import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

export default mongoose.model("Note", noteSchema);
