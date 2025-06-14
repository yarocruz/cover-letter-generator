import { useState, useRef } from 'react';
import { getCoverLetterCount, incrementCoverLetterCount } from '../utils/usage';
import UpsellModal from './components/UpsellModal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Home() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [tone, setTone] = useState('Formal');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const pdfRef = useRef();

  async function handleGenerate() {
    const count = getCoverLetterCount();
    const isPremium = localStorage.getItem('hasPremiumAccess') === 'true';

    if (!isPremium && count >= 1) {
      setShowModal(true);
      return;
    }

    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobTitle, jobDescription, userInfo, tone }),
    });
    const data = await res.json();
    setResult(data.coverLetter);
    setLoading(false);
    incrementCoverLetterCount();
  }

  async function handleDownloadPDF() {
    const input = pdfRef.current;
    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2, // higher for better quality
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('cover-letter.pdf');
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Main content */}
      <main className="flex-1 p-10">
        <div className="max-w-2xl mx-auto mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            ✍️ Your Next Job Starts with the Right Words
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Stop staring at a blank page. Instantly generate a personalized, professional cover letter that sounds like you — not a robot.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            First one’s free. Unlimited letters for just $5.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold">Generate your cover letter</h2>

          <div>
            <label className="block font-medium mb-1">Job Title</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Job Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Your Background</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              value={userInfo}
              onChange={(e) => setUserInfo(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tone</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Formal</option>
              <option>Friendly</option>
              <option>Confident</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            {loading ? 'Generating...' : 'Generate Cover Letter'}
          </button>

          {result && (
            <>
              <div
                ref={pdfRef}
                className="bg-white text-black p-6 rounded-lg shadow font-serif whitespace-pre-wrap leading-relaxed"
                style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}
              >
                {result}
              </div>

              <button
                onClick={handleDownloadPDF}
                className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
              >
                Download as PDF
              </button>
            </>
          )}
        </div>
      </main>
      {showModal && <UpsellModal onClose={() => setShowModal(false)} />}
    </div>
  );
}