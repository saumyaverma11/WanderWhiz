import { useEffect, useState, useContext } from "react";

import {
    getProfile,
    updateProfile,
    updatePreferences,
    deleteAccount,
    uploadImage,
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




    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await uploadImage(formData);

            const updatedUser = {
                ...user,
                profileImage: res.profileImage,
            };

            setUser(updatedUser);

            // 🔥 update navbar instantly
            login({
                ...auth,
                user: updatedUser,
            });

        } catch (error) {
            console.error("Upload failed");
        }
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


                <div className="flex items-center justify-between mb-6">

                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-5">

                        {/* Avatar */}
                        <div className="relative">
                            <img
                                src={
                                    user.profileImage
                                        ? `http://localhost:5000/${user.profileImage}`
                                        : "https://ui-avatars.com/api/?name=" + user.name
                                }
                                className="h-20 w-20 rounded-full object-cover border-4 border-orange-100 shadow"
                            />

                            {/* Camera Upload Button */}
                            <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full cursor-pointer hover:bg-orange-600">
                                📷
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* User Info */}
                        <div>
                            <p className="text-xl font-semibold text-gray-800">{user.name}</p>
                            <p className="text-gray-500 text-sm">{user.email}</p>

                            {user.createdAt && (
                                <p className="text-gray-400 text-xs mt-1">
                                    Joined {new Date(user.createdAt).toDateString()}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* EDIT BUTTON */}
                    {!edit ? (
                        <button
                            onClick={() => setEdit(true)}
                            className="border border-orange-400 text-orange-500 px-4 py-1 rounded-lg hover:bg-orange-50"
                        >
                            ✏️ Edit
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEdit(false)}
                                className="border px-4 py-1 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-orange-600"
                            >
                                Save
                            </button>
                        </div>
                    )}
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
                    className="w-full border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-200 p-3 rounded-lg outline-none"
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