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

Return ONLY JSON. No explanation. No text. No markdown.

STRICT FORMAT:

{
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "morning": {
        "activity": "text",
        "recommended_places": [
          { "name": "place", "description": "text" }
        ]
      },
      "afternoon": {
        "activity": "text",
        "recommended_places": []
      },
      "evening": {
        "activity": "text",
        "recommended_places": []
      },
      "estimated_budget_for_day": number
    }
  ]
}

IMPORTANT RULES:
- Output must be valid JSON
- No line breaks inside any string
- Do NOT use \\n or new lines
- Do NOT wrap JSON in quotes

🔥 CONTENT RULES:
- Each activity must be detailed (20-30 words)
- Write in ONE LINE only
- Use simple and clear English
- Make it descriptive like a travel guide

Trip Details:
Destination: ${tripData.destination}
Travel Type: ${tripData.travelType}
Dates: ${tripData.startDate} to ${tripData.endDate}
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

    

    let parsed;

try {
  const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);

  if (!jsonMatch) throw new Error("No JSON");

  parsed = JSON.parse(jsonMatch[0]);

  // 🔥 CASE 1: AI wrapped JSON as string
  if (typeof parsed === "string") {
    parsed = JSON.parse(parsed);
  }

  // 🔥 CASE 2: Wrong nesting inside morning
  if (parsed.days && parsed.days.length > 0) {
    const first = parsed.days[0];

    if (
      typeof first.morning === "string" &&
      first.morning.includes('"days"')
    ) {
      console.log("🔥 FIXING NESTED JSON");

      parsed = JSON.parse(first.morning);
    }
  }

} catch (err) {
  console.log("❌ AI parsing failed");

  parsed = {
    days: [
      {
        day: 1,
        morning: { activity: cleanContent },
        afternoon: { activity: cleanContent },
        evening: { activity: cleanContent },
      },
    ],
  };
}
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