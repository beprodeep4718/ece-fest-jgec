import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["individual", "team"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  maxTeamMembers: {
    type: Number,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
