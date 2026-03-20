import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../services/auth.service";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
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

      const res = await loginUser(form);

      console.log(res);

      // Save token
      localStorage.setItem("token", res.token);

      // redirect dashboard
      navigate("/dashboard");

    } catch (error) {

      console.error(error);
      alert("Login failed");

    }
  };

  return (
    <AuthLayout
      title="Login to WanderWhiz"
      subtitle="Access your travel dashboard"
    >

      <form onSubmit={handleSubmit} className="space-y-4">

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
          Login
        </button>

      </form>

      <p className="text-center mt-4 text-gray-600">
        Don't have an account?
        <Link to="/register" className="text-orange-500 ml-1">
          Register
        </Link>
      </p>

    </AuthLayout>
  );
}

export default Login;