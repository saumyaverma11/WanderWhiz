import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    travelType: {
      type: String,
      enum: ["solo", "family", "couple", "friends"],
      required: true,
    },

    preferences: {
      type: [String],
      default: [],
    },

    itinerary: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);