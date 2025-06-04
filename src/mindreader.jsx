import React, { useState, useRef } from 'react';
import audioFile from './assets/Nokia-Arabic-Ringstone-Sound-Effect.mp3';
import './MindReader.css';

const MindReader = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const audioRef = useRef(null);

  const handleSubmit = () => {
    if (!input.trim()) return;

    // Play the audio on user interaction
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.muted = false; // Ensure it's not muted
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
    <div className="MindReader">
      <audio ref={audioRef} src={audioFile} loop />
      <h1 className="text-3xl font-bold mb-6">Mind Reader 🤯</h1>
      <h3> - By krimerwool</h3>

      {!loading && !revealed && (
        <>
          <p className="mb-4 text-lg">Enter a number and I will magically read your mind.</p>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            
            placeholder="Enter your number"
          />
          <button
            onClick={handleSubmit}
            
          >
            Read My Mind
          </button>
        </>
      )}

      {loading && (
        <div className="loading">
          <p>Reading your mind...</p>
          <div className="pulse">🔮</div>
        </div>
      )}

      {revealed && (
        <div className="revealed">
          You were thinking of <span style= {{ color: '#10b981'}}>{input}</span>! 🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯
        </div>
      )}
    </div>
  );
};

export default MindReader;