export const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is WanderWhiz?",
        a: "WanderWhiz is an AI-powered travel planner that generates personalized day-by-day itineraries for any destination in the world. Simply enter your destination, travel dates, and travel style — and our AI does the rest."
      },
      {
        q: "Is WanderWhiz free to use?",
        a: "Yes! Creating an account and planning trips is completely free. You get unlimited itinerary generation, weather data, and nearby place discovery at no cost."
      },
      {
        q: "How do I get started?",
        a: "Click 'Get Started' to create a free account. Once registered, go to your dashboard and click 'New Trip'. Enter your destination and travel details, and your AI itinerary will be ready in seconds."
      },
      {
        q: "Do I need to install anything?",
        a: "No downloads or installations needed. WanderWhiz is a web app that works in any modern browser on desktop, tablet, or mobile."
      }
    ]
  },

  {
    category: "AI Itineraries",
    questions: [
      {
        q: "How does the AI itinerary generation work?",
        a: "We use Groq’s LLM (llama-3.3-70b) to generate detailed, contextual itineraries based on your destination, travel dates, and travel type. Each itinerary includes morning, afternoon, and evening activities for every day."
      },
      {
        q: "Can I regenerate or edit my itinerary?",
        a: "Absolutely. You can edit any trip and choose to regenerate the AI itinerary with your updated details — new destination, dates, or travel style. Your old itinerary is replaced with a fresh one."
      },
      {
        q: "How accurate and realistic are the itineraries?",
        a: "Our AI generates genuine activity suggestions based on real places and experiences in each destination. While we recommend verifying opening hours for specific attractions, the day structure and activity mix are travel-tested."
      },
      {
        q: "Can I plan trips for any destination?",
        a: "Yes — WanderWhiz works for any city, region, or country worldwide. From Paris to Patagonia, Kyoto to Cape Town."
      }
    ]
  },

  {
    category: "Features & Data",
    questions: [
      {
        q: "Where does the weather data come from?",
        a: "We use the OpenWeather API to provide real-time current weather conditions for your destination, including temperature, humidity, wind speed, and weather descriptions."
      },
      {
        q: "How does the 'Nearby Places' feature work?",
        a: "We integrate location-based APIs like Google Maps to fetch nearby attractions, restaurants, and points of interest based on your selected destination."
      },
      {
        q: "Can I download or share my itinerary?",
        a: "Yes. On the trip detail page, click 'Download PDF' to print or save your itinerary. You can also copy the trip URL to share it."
      },
      {
        q: "Can I set travel preferences?",
        a: "Yes. In your Profile page you can set your budget level (budget, mid-range, luxury) and travel style (adventure, cultural, relaxation, family, solo). These inform your future itinerary suggestions."
      }
    ]
  },

  {
    category: "Account & Privacy",
    questions: [
      {
        q: "How is my data protected?",
        a: "All accounts are secured with JWT authentication and bcrypt password hashing. Your trips are private and only visible to you. We do not sell your data or show ads."
      },
      {
        q: "Can I delete my account?",
        a: "Yes. Go to Profile → Danger Zone → Delete My Account. This permanently removes your account and all associated trips immediately."
      },
      {
        q: "What is the Admin role?",
        a: "Admin accounts have access to a special dashboard to manage users and trips across the platform. You can choose to register as an Admin during sign-up."
      },
      {
        q: "Can I change my password?",
        a: "Yes. Navigate to your Profile page and use the 'Change Password' section. You'll need to enter your current password to confirm."
      }
    ]
  }
];