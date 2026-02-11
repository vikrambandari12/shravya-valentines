import { useState, useEffect, useRef } from "react";
import "./App.css";

import ranjha from "./assets/ranjha.mp3";
import sticker1 from "./assets/sticker1.gif";
import sticker2 from "./assets/sticker2.gif";
import sticker3 from "./assets/sticker3.gif";

function App() {
  const [accepted, setAccepted] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [celebrations, setCelebrations] = useState([]);
  const [stickerIndex, setStickerIndex] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: "65%", left: "60%" });

  const audioRef = useRef(null);

  const stickers = [sticker1, sticker2, sticker3];
  const emojis = ["💖", "🎉", "✨", "💥"];

  // Floating hearts + celebrations after YES
  useEffect(() => {
    if (!accepted) return;

    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev,
        { id: Math.random(), left: Math.random() * 100 }
      ]);

      setCelebrations(prev => [
        ...prev,
        {
          id: Math.random(),
          left: Math.random() * 100,
          emoji: emojis[Math.floor(Math.random() * emojis.length)]
        }
      ]);
    }, 400);

    return () => clearInterval(interval);
  }, [accepted]);

  // Stickers one by one loop
  useEffect(() => {
    if (!accepted) return;

    const stickerTimer = setInterval(() => {
      setStickerIndex(prev => (prev + 1) % stickers.length);
    }, 3000);

    return () => clearInterval(stickerTimer);
  }, [accepted]);

  // Move NO button
  const moveNoButton = () => {
    const top = Math.random() * 70;
    const left = Math.random() * 70;
    setNoPosition({ top: `${top}%`, left: `${left}%` });
  };

  // YES clicked
  const handleYes = () => {
    setAccepted(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="container">
      <audio ref={audioRef} src={ranjha} loop />

      {/* Floating Hearts */}
      {accepted &&
        hearts.map(h => (
          <div key={h.id} className="heart" style={{ left: `${h.left}%` }}>
            💖
          </div>
        ))}

      {/* Celebration Emojis */}
      {accepted &&
        celebrations.map(c => (
          <div
            key={c.id}
            className="celebration"
            style={{ left: `${c.left}%` }}
          >
            {c.emoji}
          </div>
        ))}

      {!accepted ? (
        <div className="card">
          <h1>Happy Valentine's Day ❤️</h1>
          <h2>For My Love Shravya 💕</h2>

          <p className="message">
            You are the most special person in my life.
          </p>

          <h2 className="question">Will you marry me? 💍</h2>

          <div className="buttons">
            <button className="yesBtn" onClick={handleYes}>
              Yes ❤️
            </button>

            <button
              className="noBtn"
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={{ top: noPosition.top, left: noPosition.left }}
            >
              No 😜
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <h1>She Said YES! 💍🎉</h1>

          <p className="message">
            Shravya, you are my forever.<br />
            I promise to love you endlessly.<br />
            Our beautiful journey begins now ❤️
          </p>

          {/* Sticker one by one */}
          <div className="sticker-container">
            <img
              key={stickerIndex}
              src={stickers[stickerIndex]}
              alt="sticker"
              className="sticker"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
