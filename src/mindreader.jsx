import React, { useState, useEffect, useRef } from 'react';

const MindReader = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.muted = true;
      audio.play().catch((err) => {
        console.warn('Autoplay may be blocked:', err);
      });
    }
  }, []);

  const handleSubmit = () => {
    if (!input.trim()) return;

    // Unmute and play the audio on user interaction
    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) =>
          console.warn('Play failed on user interaction:', err)
        );
      }
    }

    setLoading(true);
    setRevealed(false);

    setTimeout(() => {
      setLoading(false);
      setRevealed(true);
    }, 10000);
  };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <audio ref={audioRef} src="/Nokia-Arabic-Ringstone-Sound-Effect.mp3" autoPlay loop muted />
        <h1 className="text-3xl font-bold mb-6">Mind Reader 🤯</h1>
        <h3> - By krimerwool</h3>

        {!loading && !revealed && (
            <>
            <p className="mb-4 text-lg">Enter a number and I will magically read your mind.</p>
            <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="p-2 rounded text-black"
                placeholder="Enter your number"
            />
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
            >
                Reveal My Mind
            </button>
            </>
        )}

        {loading && (
            <div className="mt-10 text-center">
            <p className="mb-4 text-lg">Reading your mind...</p>
            <div className="animate-pulse text-4xl">🔮</div>
            </div>
        )}

        {revealed && (
            <div className="mt-10 text-center text-2xl font-semibold">
            You were thinking of the number <span className="text-green-400">{input}</span>! 🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯
            </div>
        )}
        </div>
    );
};

export default MindReader;
