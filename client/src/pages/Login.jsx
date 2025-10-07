import { useState } from "react";
import { api } from "../lib/axios";
import { useAuth } from "../lib/auth";

export default function Login() {
  const { loginSuccess } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      loginSuccess({ token: res.data.token, user: res.data.user });
      window.location.href = "/";
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed");
    }
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto bg-white p-6 mt-12 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <input className="input w-full mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input w-full mb-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn w-full mt-2">Sign In</button>
    </form>
  );
}
