import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password not required if googleId exists
    }
  },
  googleId: {
    type: String,
    sparse: true, // Allows null values but ensures uniqueness when present
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { timestamps: true })

export default mongoose.model("User", userSchema);