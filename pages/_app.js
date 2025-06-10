import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
        <a href="/" className="font-bold text-xl text-blue-600">Coverly</a>
        <div className="space-x-4 text-sm">
          <a href="/pricing" className="text-gray-700 hover:underline">Pricing</a>
          <a href="/guide" className="text-gray-700 hover:underline">How it Works</a>
        </div>
      </nav>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
