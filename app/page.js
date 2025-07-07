import './globals.css';
import { Facebook, Phone, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Welcome to Gensem AI
      </h1>
      <p className="text-gray-300 text-lg text-center max-w-xl mb-10">
        Your AI Hustle Partner – Generate your Seminar paper here
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full">
        <Image
          src="/images/alozie.jpg"
          alt="Profile Photo"
          width={250}
          height={250}
          className="rounded-2xl object-cover border-4 border-white shadow-lg"
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-2">About the developer</h2>
          <p className="text-gray-300 mb-4">
            Meet Dr. Alozie Godswill Onyedikachi, an <span className="font-semibold text-white">Eye Doctor</span> (Optometrist)
            with 2 years of experience and also a <span className="font-semibold text-white">Web Developer</span> with 1 year of experience.
            I’m passionate about building <span className="text-white">AI-powered</span> and <span className="text-white">eCommerce</span> websites to make life easier and smarter.
          </p>

          <div className="flex justify-center md:justify-start gap-6">
            <a href="https://wa.me/2347067208592" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-6 h-6 text-green-400 hover:text-green-500" />
            </a>
            <a href="https://facebook.com/profile.php?id=100090599809805" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6 text-blue-500 hover:text-blue-600" />
            </a>
            <a href="tel:+2347067208592">
              <Phone className="w-6 h-6 text-white hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
