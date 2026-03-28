// src/services/ai.service.js
import Groq from "groq-sdk";

export const generateAIItinerary = async (tripData) => {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const weatherSection =
      tripData.weather && tripData.weather.length > 0
        ? `
Weather Forecast:
${JSON.stringify(tripData.weather, null, 2)}

Adapt activities based on weather conditions.
`
        : "";

    const prompt = `
You are an expert AI Travel Planner.

Create a detailed day-wise travel itinerary in STRICT JSON format.

Trip Details:
Destination: ${tripData.destination}
Travel Type: ${tripData.travelType}
Start Date: ${tripData.startDate}
End Date: ${tripData.endDate}
Preferences: ${tripData.preferences?.join(", ")}

${weatherSection}

Rules:
1. Divide each day into: morning, afternoon, evening.
2. Include:
   - day
   - date
   - morning
   - afternoon
   - evening
   - recommended_places (array of objects with name + description)
   - estimated_budget_for_day
3. Return ONLY valid JSON.
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;

    console.log("AI RAW CONTENT:", content);

    // ❌ If empty
    if (!content) {
      return {
        itinerary: [
          {
            day: 1,
            morning: "No data",
            afternoon: "No data",
            evening: "No data",
          },
        ],
      };
    }

    const cleanContent = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // ✅ Try parsing JSON
    let parsed;

    try {
      // ✅ Extract JSON safely
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("No JSON found");
      }

      parsed = JSON.parse(jsonMatch[0]);

    } catch (err) {
      console.log("❌ JSON parse failed:", err.message);

      // ✅ SAFE FALLBACK (NO CRASH)
      parsed = {
        itinerary: [
          {
            day: 1,
            morning: cleanContent,
            afternoon: cleanContent,
            evening: cleanContent,
          },
        ],
      };
    }

    // ✅ NORMALIZATION (KEEP THIS)
 
    return parsed;

  } catch (error) {
    console.error("Groq API Error:", error.message);
    return {
      itinerary: [
        {
          day: 1,
          morning: "AI failed, try again",
          afternoon: "AI failed, try again",
          evening: "AI failed, try again",
        },
      ],
    };
  }
};