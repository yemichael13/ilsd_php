import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api.js";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("email", email);
    fd.append("password", password);

    const res = await fetch(API.login, {
      method: "POST",
      body: fd,
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      onLogin && onLogin();
      navigate('/admin');
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={submit}
    className="w-1/2 mx-auto mt-10 border rounded-lg flex flex-col gap-4 bg-green-50 justify-center items-center p-10"
    >
      <h2 className="text-center text-5xl font-bold mb-10">Admin Login</h2>
    
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-4 rounded-lg w-2/3 p-2 border focus:outline-none "
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="px-4 rounded-lg w-2/3 p-2 border focus:outline-none  "
      />

      <button
      className="bg-green-800 rounded-sm text-white font-bold border border-green-800 hover:text-green-800 hover:bg-white transition-color duration-300 cursor-pointer w-1/4 text-3xl py-2 px-4 mt-4">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
