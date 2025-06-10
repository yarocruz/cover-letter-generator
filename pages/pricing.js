export default function Pricing() {
    async function handlePurchase() {
        const res = await fetch('/api/create-checkout-session', { method: 'POST' });
        const data = await res.json();
        window.location.href = data.url;
    }
    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-900">
            <main className="flex-1 p-10">
                <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto space-y-6">
                    <h1 className="text-3xl font-bold mb-4">Pricing</h1>
                    <p className="mb-6">Pay once, generate up to 3 cover letters.</p>
                    <p className="text-2xl font-semibold mb-6">$5</p>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={handlePurchase}
                    >
                        Buy Now
                    </button>
                </div>
            </main>

        </div>
    );
}