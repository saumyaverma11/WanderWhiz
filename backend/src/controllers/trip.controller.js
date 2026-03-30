import Trip from "../models/Trip.model.js";

// Create Trip
export const createTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate, travelType, preferences } = req.body;

    const trip = await Trip.create({
      user: req.user.id,
      destination,
      startDate,
      endDate,
      travelType,
      preferences,
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Error creating trip", error: error.message });
  }
};

// Get All Trips of Logged-in User
export const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user.id,
      isDeleted: false
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips" });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip" });
  }
};


export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // ✅ SOFT DELETE
    trip.isDeleted = true;
    await trip.save();

    res.json({ message: "Trip deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};