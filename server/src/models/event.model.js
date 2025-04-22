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
  rulesAndRegulations: {
    eligibility: {
      type: String,
    },
    structure: [String],
    competitionObjective: [String],
    questionFormat: [String],
    scoring: [String],
    judgingCriteria: [String],
    debateFormat: [String],
    speakingTime: [String],
    objective: {
      type: String,
    },
    eventStructure: [String],
    toolsAndMaterials: [String],
    materialsAndRules: [String],
    generalRules: [String],
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
