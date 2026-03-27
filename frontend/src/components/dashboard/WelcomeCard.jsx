function WelcomeCard({ user }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Hello, {user?.name || "Traveler"} 👋
      </h2>
      <p className="text-gray-500 mt-1">
        Plan your next journey with AI-powered insights.
      </p>
    </div>
  );
}

export default WelcomeCard;