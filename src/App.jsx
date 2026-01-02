import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="bg-custom-bg text-custom-text flex min-h-screen items-center justify-center">
      <div className="w-[320px] rounded-2xl border border-black/10 p-8 text-center shadow-xl dark:border-white/10">
        <h1 className="mb-6 text-3xl">Counter App</h1>

        <div className="mb-6 text-5xl font-semibold">{count}</div>

        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={() => setCount(count - 1)}
            className="bg-custom-primary rounded-lg px-5 py-2 font-medium text-white hover:opacity-90"
          >
            −
          </button>

          <button
            onClick={() => setCount(count + 1)}
            className="bg-custom-primary rounded-lg px-5 py-2 font-medium text-white hover:opacity-90"
          >
            +
          </button>
        </div>

        <button
          onClick={() => setCount(0)}
          className="text-sm underline opacity-70 hover:opacity-100"
        >
          Reset
        </button>

        <div className="mt-6">
          <button
            onClick={toggleDarkMode}
            className="border-custom-primary rounded-lg border px-4 py-2 text-sm"
          >
            Toggle Dark Mode
          </button>
        </div>
      </div>
    </div>
  );
}
