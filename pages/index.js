import { useState } from 'react';
import { getCoverLetterCount, incrementCoverLetterCount } from '../utils/usage';

export default function Home() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [tone, setTone] = useState('Formal');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    const count = getCoverLetterCount();

    if (count >= 1) {
      alert('You’ve used your free cover letter. Unlock unlimited access for just $5.');
      window.location.href = '/pricing';
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

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">


      {/* Main content */}
      <main className="flex-1 p-10">
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
            <div className="bg-gray-100 border rounded-lg p-4 whitespace-pre-wrap font-serif text-gray-800 leading-relaxed">
              {result}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}