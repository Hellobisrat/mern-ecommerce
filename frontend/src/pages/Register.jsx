import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export default function Register() {
  const { register, loading, error } = useUserStore();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await register(form);
    if (ok) navigate("/");
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-xl font-semibold text-gray-900">Create account</h1>
      {error && (
        <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-700">Name</label>
          <input
            name="name"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button
          disabled={loading}
          className="mt-2 w-full rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
      <p className="mt-3 text-xs text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}