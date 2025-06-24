"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="p-6">Loading...</p>;
  if (!session) return <p className="p-6">You must be logged in to view the dashboard.</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {session.user.name || "User"}!</h1>
      <p>Email: {session.user.email}</p>
      <img
        src={session.user.avatar || "https://via.placeholder.com/150"}
        alt="avatar"
        className="w-24 h-24 rounded-full mt-4"
      />
    </div>
  );
}
