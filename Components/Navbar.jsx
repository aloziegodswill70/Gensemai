'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session, status } = useSession()

  console.log('🔍 NAVBAR STATUS:', status)
  console.log('🔍 NAVBAR SESSION:', session)

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Gensem AI</h1>
      <div className="space-x-4">
        {status === 'loading' ? (
          <span>Loading...</span>
        ) : status === 'authenticated' ? (
          <>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/generate" className="hover:underline">Generate</Link>
            <Link href="/profile" className="hover:underline">Profile</Link>
            <button
              onClick={() => signOut()}
              className="hover:underline text-red-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
