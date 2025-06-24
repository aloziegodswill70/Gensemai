'use client';

import { useState } from 'react';

export default function GeneratePage() {
  const [topic, setTopic] = useState('');
  const [seminar, setSeminar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate seminar paper');
      }

      const data = await res.json();
      setSeminar(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Seminar Paper</h1>
      <input
        type="text"
        placeholder="Enter seminar topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {seminar && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Topic: {seminar.topic}</h2>
          <div>
            <h3 className="font-bold">Introduction</h3>
            <p>{seminar.introduction}</p>
          </div>
          <div>
            <h3 className="font-bold">Literature Review</h3>
            <p>{seminar.literatureReview}</p>
          </div>
          <div>
            <h3 className="font-bold">Body</h3>
            <p>{seminar.body}</p>
          </div>
          <div>
            <h3 className="font-bold">Conclusion</h3>
            <p>{seminar.conclusion}</p>
          </div>
          <div>
            <h3 className="font-bold">References</h3>
            <p>{seminar.references}</p>
          </div>
        </div>
      )}
    </div>
  );
}
