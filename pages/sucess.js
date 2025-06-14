import { use, useEffect } from 'react';

export default function Success() {
    useEffect(() => {
        localStorage.setItem('hasPremiumAccess', 'true');
        localStorage.removeItem('coverLetterCount');
    }, []);
    return (
        <div className="max-w-2xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Success 🎉</h1>
            <p className="mb-4">Thank you for your purchase!</p>
            <p>You now have unlimited access to generate cover letters.</p>
            <a href="/" className="text-blue-600 underline mt-4 block">Go to Generator</a>
        </div>
    );
}