'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      router.push('/login');
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg font-medium text-gray-600">Logging out...</p>
    </div>
  );
}
