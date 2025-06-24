// components/Footer.js
export default function Footer() {
  return (
    <footer className="text-center py-4 mt-10 border-t text-gray-500 text-sm hover:text-gray-700 transition">
      &copy; {new Date().getFullYear()} Gensem AI. All rights reserved.
    </footer>
  );
}
