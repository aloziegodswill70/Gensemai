// app/page.js or app/home/page.js (depending on your route setup)
import './globals.css'

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Welcome to Gensem AI
      </h1>
      <p className="text-gray-300 text-lg text-center max-w-xl">
        Your AI Hustle Partner – Generate CVs, Instagram content, and business ideas in seconds.
      </p>
    </main>
  )
}
