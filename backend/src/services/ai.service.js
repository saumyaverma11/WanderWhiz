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

Generate a COMPLETE travel itinerary in STRICT JSON format.

IMPORTANT:
- Return ONLY JSON
- Do NOT add explanation text
- Do NOT use markdown
- JSON must be valid and parsable

FORMAT:

{
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "morning": {
        "activity": "string",
        "recommended_places": [
          {
            "name": "string",
            "description": "string"
          }
        ]
      },
      "afternoon": {
        "activity": "string",
        "recommended_places": [
          {
            "name": "string",
            "description": "string"
          }
        ]
      },
      "evening": {
        "activity": "string",
        "recommended_places": [
          {
            "name": "string",
            "description": "string"
          }
        ]
      },
      "estimated_budget_for_day": number
    }
  ]
}

Trip Details:
Destination: ${tripData.destination}
Travel Type: ${tripData.travelType}
Start Date: ${tripData.startDate}
End Date: ${tripData.endDate}
Preferences: ${tripData.preferences?.join(", ")}

${weatherSection}
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