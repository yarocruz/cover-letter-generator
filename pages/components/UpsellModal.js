export default function UpsellModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
                <h2 className="text-xl font-bold text-gray-800">You’ve hit your free limit</h2>
                <p className="text-gray-600">
                    You’ve used your one free cover letter generation. Unlock unlimited access for just $5.
                </p>
                <button
                    onClick={() => (window.location.href = '/pricing')}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Unlock Unlimited Access
                </button>
                <button
                    onClick={onClose}
                    className="w-full text-sm text-gray-500 hover:underline mt-2"
                >
                    Not now
                </button>
            </div>
        </div>
    );
}