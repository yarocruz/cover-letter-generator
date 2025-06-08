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
    <div className="max-w-3xl mx-auto p-6">
      {/* <h1 className="text-3xl font-bold mb-6">AI Cover Letter Generator</h1> */}

      <label className="block mb-2 font-semibold">Job Title</label>
      <input
        className="w-full border p-2 rounded mb-4"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <label className="block mb-2 font-semibold">Job Description</label>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={4}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <label className="block mb-2 font-semibold">Your Background Info</label>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={4}
        value={userInfo}
        onChange={(e) => setUserInfo(e.target.value)}
      />

      <label className="block mb-2 font-semibold">Tone</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option>Formal</option>
        <option>Friendly</option>
        <option>Confident</option>
      </select>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Cover Letter'}
      </button>

      {result && (
        <div className="mt-6 border p-4 rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Generated Cover Letter</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}