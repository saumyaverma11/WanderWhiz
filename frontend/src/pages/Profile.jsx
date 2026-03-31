import { useEffect, useState, useContext } from "react";
import {
  getProfile,
  updateProfile,
  updatePreferences,
  deleteAccount,
} from "../services/profile.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const { auth, login } = useContext(AuthContext);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const data = await getProfile();
    setUser(data);
  };

  const handleSave = async () => {
    const updated = await updateProfile({
      name: user.name,
      bio: user.bio,
    });

    setUser(updated);
    setEdit(false);

    // 🔥 UPDATE NAVBAR DATA
    const updatedAuth = {
      ...auth,
      user: updated,
    };
    login(updatedAuth);
  };

  const handlePreferences = async () => {
    const updated = await updatePreferences({
      budget: user.budget,
      travelStyle: user.travelStyle,
    });

    setUser(updated);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete account permanently?")) return;

    await deleteAccount();
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="space-y-6">

      {/* PERSONAL INFO */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Personal Info</h2>

          {!edit ? (
            <button onClick={() => setEdit(true)} className="text-orange-500">
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setEdit(false)}>Cancel</button>
              <button
                onClick={handleSave}
                className="bg-orange-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-orange-200 flex items-center justify-center text-xl font-bold text-orange-600">
            {user.name?.charAt(0)}
          </div>

          <div>
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-gray-400 text-xs">
              Joined {new Date(user.createdAt).toDateString()}
            </p>
          </div>
        </div>

        {/* NAME */}
        <input
          className="w-full border p-2 rounded mb-3"
          value={user.name || ""}
          disabled={!edit}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        {/* BIO */}
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Tell us about yourself..."
          value={user.bio || ""}
          disabled={!edit}
          onChange={(e) => setUser({ ...user, bio: e.target.value })}
        />
      </div>

      {/* PREFERENCES */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Travel Preferences</h2>

        <div className="flex gap-4">
          <select
            className="border p-2 rounded w-full"
            value={user.budget || ""}
            onChange={(e) => setUser({ ...user, budget: e.target.value })}
          >
            <option value="">Select Budget</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            className="border p-2 rounded w-full"
            value={user.travelStyle || ""}
            onChange={(e) =>
              setUser({ ...user, travelStyle: e.target.value })
            }
          >
            <option value="">Select Style</option>
            <option>Solo</option>
            <option>Couple</option>
            <option>Family</option>
          </select>
        </div>

        <button
          onClick={handlePreferences}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
        >
          Save Preferences
        </button>
      </div>

      {/* DANGER ZONE */}
      <div className="bg-red-100 p-6 rounded-xl border border-red-300">
        <h2 className="text-red-600 font-semibold mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-600 mb-3">
          Permanently delete your account and all trips.
        </p>

        <button
          onClick={handleDelete}
          className="text-red-600 border border-red-500 px-4 py-2 rounded"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Profile;