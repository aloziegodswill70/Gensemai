// components/Footer.js
export default function Footer() {
  return (
    <footer className=" bg-blue-700 text-center py-4 mt-10 border-t text-white text-sm hover:text-gray-700 transition">
      &copy; {new Date().getFullYear()} Gensem AI. All rights reserved.
    </footer>
  );
}
