import DashboardLayout from "../layouts/DashboardLayout";
import TripForm from "../components/dashboard/TripForm";
import TripList from "../components/dashboard/TripList";

const Dashboard = () => {
  return (
    <div>

      {/* Hero Section */}
      <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow">

        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-4xl font-bold">
            Explore Your Next Adventure ✈️
          </h1>
          <p className="text-gray-200 mt-2">
            AI-powered smart travel planning
          </p>
        </div>

      </div>

      <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
      <p className="text-gray-500 mb-6">Ready for your next adventure?</p>
      {/* Trip Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <TripForm />
      </div>

      {/* Trip List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <TripList />
      </div>
    </div>

  );
};

export default Dashboard;