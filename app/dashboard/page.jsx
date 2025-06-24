'use client';

import { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Dashboard = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const seminarRefs = useRef({});

  useEffect(() => {
    const fetchSeminars = async () => {
      const res = await fetch('/api/auth/seminar');
      if (res.ok) {
        const data = await res.json();
        setSeminars(data);
      }
      setLoading(false);
    };
    fetchSeminars();
  }, []);

  const handleDownloadPDF = async (seminarId) => {
    const content = seminarRefs.current[seminarId];
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('seminar.pdf');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Seminar Projects</h1>
      {loading ? (
        <p>Loading...</p>
      ) : seminars.length === 0 ? (
        <p>No seminar projects found. Try generating one!</p>
      ) : (
        <ul className="space-y-4">
          {seminars.map((seminar) => (
            <li key={seminar.id} className="border p-4 rounded shadow">
              <h2 className="font-semibold text-xl">{seminar.topic}</h2>
              <p className="text-sm text-gray-500">
                Generated: {new Date(seminar.createdAt).toLocaleString()}
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-blue-600">View Details</summary>
                <div
                  ref={(el) => (seminarRefs.current[seminar.id] = el)}
                  className="mt-2 space-y-2 bg-white p-4"
                >
                  <p><strong>Introduction:</strong> {seminar.introduction}</p>
                  <p><strong>Literature Review:</strong> {seminar.literatureReview}</p>
                  <p><strong>Body:</strong> {seminar.body}</p>
                  <p><strong>Conclusion:</strong> {seminar.conclusion}</p>
                  <p><strong>References:</strong> {seminar.references}</p>
                </div>
              </details>
              <button
                className="mt-3 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                onClick={() => handleDownloadPDF(seminar.id)}
              >
                Download PDF
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
