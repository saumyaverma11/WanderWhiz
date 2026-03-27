import { useState } from "react";
import { createTrip } from "../../services/trip.service";
import { generateAITrip } from "../../services/ai.service";
import { FaPlane } from "react-icons/fa";
import AIResult from "./AIResult";

const TripForm = () => {
  const [form, setForm] = useState({
    destination: "",
    travelType: "solo",
    startDate: "",
    endDate: ""
  });

  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const trip = await createTrip(form);
      const aiRes = await generateAITrip(trip._id);

      setAiData(aiRes);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error generating trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Destination"
          className="border p-3 rounded-lg"
          value={form.destination}
          onChange={(e) =>
            setForm({ ...form, destination: e.target.value })
          }
          required
        />

        <select
          className="border p-3 rounded-lg"
          value={form.travelType}
          onChange={(e) =>
            setForm({ ...form, travelType: e.target.value })
          }
        >
          <option value="solo">Solo</option>
          <option value="family">Family</option>
          <option value="couple">Couple</option>
        </select>

        <input
          type="date"
          className="border p-3 rounded-lg"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
          required
        />

        <input
          type="date"
          className="border p-3 rounded-lg"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
          required
        />

        <button className="col-span-2 bg-orange-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition">

          {loading ? "Generating..." : (
            <>
              <FaPlane />
              Generate AI Trip
            </>
          )}

        </button>

      </form>

      <AIResult data={aiData} />
    </>
  );
};

export default TripForm;