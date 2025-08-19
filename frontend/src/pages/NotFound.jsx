export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#22303d] via-[#2a4a57] to-teal-600 text-white text-center p-6">
      <h1 className="text-6xl font-bold tracking-tight drop-shadow-lg">
        Lost in the Waves 🌊
      </h1>
      <p className="mt-4 text-lg max-w-xl text-slate-100 leading-relaxed">
        Looks like the page drifted away with the tide.  
        But don’t worry—art always finds its way back to you.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 px-6 py-3 font-medium text-white shadow-lg transition hover:from-sky-600 hover:to-teal-700"
      >
        Back to Shore
      </a>
    </div>
  );
}
