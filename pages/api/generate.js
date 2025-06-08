export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { jobTitle, jobDescription, userInfo, tone } = req.body;

  if (!jobTitle || !jobDescription || !userInfo) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const prompt = `
Write a personalized cover letter for a job titled "${jobTitle}".
Job description: ${jobDescription}
Candidate background: ${userInfo}
Tone: ${tone}
Limit to 300 words. Avoid clichés and use a confident voice.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";

    res.status(200).json({ coverLetter: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
