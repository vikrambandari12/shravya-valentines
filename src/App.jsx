import { useState, useEffect, useRef } from "react";
import "./App.css";

import ranjha from "./assets/ranjha.mp3";
import sticker1 from "./assets/sticker1.gif";
import sticker2 from "./assets/sticker2.gif";
import sticker3 from "./assets/sticker3.gif";

// Background images
import img1 from "./assets/image1.jpeg";
import img2 from "./assets/image2.jpeg";
import img3 from "./assets/image3.jpeg";
import img4 from "./assets/image4.jpeg";
import img5 from "./assets/image5.jpeg";
import img6 from "./assets/image6.jpeg";
import img7 from "./assets/image7.jpeg";
import img8 from "./assets/image8.jpeg";
import img9 from "./assets/image9.jpeg";

function App() {
  const [accepted, setAccepted] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [celebrations, setCelebrations] = useState([]);
  const [floatingImages, setFloatingImages] = useState([]);
  const [stickerIndex, setStickerIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0); // ✅ FIX ADDED
  const [noPosition, setNoPosition] = useState({ top: "65%", left: "60%" });

  const audioRef = useRef(null);

  const stickers = [sticker1, sticker2, sticker3];
  const emojis = ["💖", "🎉", "✨", "💥", "❤️"];
  const bgImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

  // Celebration effects after YES
  useEffect(() => {
    if (!accepted) return;

    // Hearts & emoji blasts
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
    }, 300);

    // Floating images sequential loop
    const imageInterval = setInterval(() => {
      setFloatingImages(prev => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 90,
          src: bgImages[imageIndex]
        }
      ]);

      setImageIndex(prev => (prev + 1) % bgImages.length);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(imageInterval);
    };
  }, [accepted, imageIndex]); // ✅ dependency added

  // Stickers loop one-by-one
  useEffect(() => {
    if (!accepted) return;

    const stickerTimer = setInterval(() => {
      setStickerIndex(prev => (prev + 1) % stickers.length);
    }, 3000);

    return () => clearInterval(stickerTimer);
  }, [accepted]);

  // Move NO button
  const moveNoButton = () => {
    setNoPosition({
      top: `${Math.random() * 70}%`,
      left: `${Math.random() * 70}%`
    });
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

      {/* Emoji Celebrations */}
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

      {/* Floating Images */}
      {accepted &&
        floatingImages.map(img => (
          <img
            key={img.id}
            src={img.src}
            className="floating-image"
            style={{ left: `${img.left}%` }}
            alt=""
          />
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
