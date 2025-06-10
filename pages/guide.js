export default function Guide() {
    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-900">

            <main className="flex-1 p-10">
                <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto space-y-6">
                    <div className="max-w-2xl mx-auto px-6 py-10">
                        <h1 className="text-3xl font-bold mb-6">🧑‍🏫 How to Use</h1>

                        <ol className="list-decimal list-inside space-y-4 text-lg">
                            <li>
                                Paste a job description into the form on the homepage.
                            </li>
                            <li>
                                Describe your background and skills.
                            </li>
                            <li>
                                Choose a tone (formal, friendly, confident).
                            </li>
                            <li>
                                Click "Generate Cover Letter" and get a ready-to-use draft.
                            </li>
                            <li>
                                You can generate <strong>one cover letter for free</strong>. To generate more, unlock access for just $5.
                            </li>
                        </ol>

                        <div className="mt-10 text-center">
                            <a
                                href="/"
                                className="text-blue-600 underline"
                            >
                                ← Back to Generator
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
}
