import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamName: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isTeam: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
