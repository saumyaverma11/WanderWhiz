import { useState, useContext } from "react";
import { loginUser } from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await loginUser(form);
    login(data);
    alert("Login Successful");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;