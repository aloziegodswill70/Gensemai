"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function SeminarForm() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const { data: session, status } = useSession();

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (status === "unauthenticated") {
      alert("You must be logged in");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      console.log("DATA:", data); // 👈 Add this

      if (response.ok) {
        setResult(data.result);
      } else {
        alert(data.message || "Error generating content");
      }

     } catch (error) {
    console.error("Error in handleGenerate:", error); // 👈 Add this
    alert("An error occurred.");

    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <p className="p-4">Checking session...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Seminar Project</h1>
      <form onSubmit={handleGenerate}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your seminar topic..."
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {result && (
        <div className="mt-6 whitespace-pre-wrap p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Generated Project:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
