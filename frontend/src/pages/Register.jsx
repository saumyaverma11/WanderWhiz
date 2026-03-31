import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function Register() {

     const navigate = useNavigate(); 
     
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await registerUser(form);

            console.log(res);

            alert("Registration successful");

            navigate("/login");

        } catch (error) {

            console.error(error);
            alert(error.response?.data?.message || "Something went wrong");

        }
    };

    return (
        <AuthLayout
            title="Create Your Account"
            subtitle="Start planning smarter trips"
        >

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                {/* Role Selection */}
                <select
                    name="role"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                >
                    <option value="user">Traveler</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600"
                >
                    Register
                </button>

            </form>

            <p className="text-center mt-4 text-gray-600">
                Already have an account?
                <Link to="/login" className="text-orange-500 ml-1">
                    Login
                </Link>
            </p>

        </AuthLayout>
    );
}

export default Register;