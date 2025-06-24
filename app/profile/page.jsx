"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ProfilePage = () => {
  const { data: session, status, update } = useSession();
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (status === "loading") return <p className="p-6">Loading...</p>;
  if (!session) return <p className="p-6">You must be logged in to view this page.</p>;

  const handleUpload = async () => {
    if (!avatarFile) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const res = await fetch("/api/avatar", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      await update(); // refresh session data
    }

    setUploading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <div className="bg-white shadow-md p-4 rounded space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src={session.user.avatar || "https://via.placeholder.com/150"}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border"
            />

          <div>
            <input type="file" onChange={(e) => setAvatarFile(e.target.files[0])} />
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-blue-600 text-white px-3 py-1 rounded ml-2"
            >
              {uploading ? "Uploading..." : "Upload Avatar"}
            </button>
          </div>
        </div>
        <p><strong>Name:</strong> {session.user.name || "N/A"}</p>
        <p><strong>Email:</strong> {session.user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
