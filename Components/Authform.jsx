"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // optional icon lib

export default function AuthForm({ type }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/auth/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ This is NOT needed if you're using NextAuth for session management
      // localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } else {
      setMessage(data.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-4 p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold text-center">
        {type === "login" ? "Login" : "Create an Account"}
      </h2>

      {message && (
        <p className="text-red-500 text-sm text-center">{message}</p>
      )}

      <input
        type="email"
        required
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          required
          placeholder="Password"
          className="w-full p-2 border rounded pr-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
