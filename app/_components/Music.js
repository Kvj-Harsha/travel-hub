"use client"
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const playAudio = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.warn("Autoplay blocked. Waiting for user interaction.");
        }
      };
      playAudio();
    }
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div style={{ color: "grey" ,textAlign: "center", marginTop: "50px" }}>
      <button onClick={isPlaying ? handlePause : handlePlay}>
        {isPlaying ? "Pause Music = You can play only if your logged in :)" : "Play Music"}
      </button>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/audio.mp3" // Replace with your music file
        preload="auto"
        loop
      />
    </div>
  );
}
