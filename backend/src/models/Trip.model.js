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

    itinerary: [
      {
        day: Number,
        date: String,

        morning: String,
        afternoon: String,
        evening: String,

        places: [
          {
            name: String,
            description: String,

            location: {
              lat: Number,
              lng: Number,
              address: String
            },

            nearby: {
              restaurants: [
                {
                  name: String,
                  lat: Number,
                  lng: Number
                }
              ],
              hotels: [
                {
                  name: String,
                  lat: Number,
                  lng: Number
                }
              ]
            }
          }
        ],

        weather: {
          temperature: Number,
          condition: String,
          humidity: Number
        }
      }
    ],

    isDeleted: {
      type: Boolean,
      default: false
    }

  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);