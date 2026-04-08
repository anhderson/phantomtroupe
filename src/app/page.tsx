'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const APPS = [
  { id: 1, name: "Discord", color: "#5865F2" },
  { id: 2, name: "Spotify", color: "#1DB954" },
  { id: 3, name: "Visual Studio Code", color: "#007ACC" },
  { id: 4, name: "GitHub", color: "#181717" },
  { id: 5, name: "YouTube", color: "#FF0000" },
  { id: 6, name: "Chrome", color: "#4285F4" },
  { id: 7, name: "Slack", color: "#4A154B" },
  { id: 8, name: "Figma", color: "#F24E1E" },
  { id: 9, name: "Notion", color: "#000000" },
  { id: 10, name: "Steam", color: "#000000" },
  { id: 11, name: "Postman", color: "#FF6C37" },
  { id: 12, name: "Docker", color: "#2496ED" },
];

export default function Home() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="black-hole-container">
      {/* Header with Logo and App Name */}
      <header className="header">
        <div className="logo-container">
          <Image
            src="/logo.png"
            alt="Phantom Troupe Logo"
            width={120}
            height={120}
            className="logo"
            priority
          />
        </div>
        <h1 className="neon-text">Phantom Troupe</h1>
        <p className="user-info">Logged in as: Chrollo Lucilfer</p>
      </header>

      {/* Central Black Hole */}
      <div className="black-hole">
        {/* Glow effect inside black hole */}
        <div className="inner-glow"></div>
      </div>

      {/* Rotating Orbit and App Circles */}
      <div 
        className="orbit"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {APPS.map((app, index) => {
          const angle = (index / APPS.length) * 360;
          const x = 300 * Math.cos((angle * Math.PI) / 180);
          const y = 300 * Math.sin((angle * Math.PI) / 180);

          return (
            <div key={app.id}>
              {/* Connection Line */}
              <div 
                className="connection-line"
                style={{ 
                  transform: `rotate(${angle}deg)`,
                  width: '300px'
                }}
              ></div>

              {/* App Circle */}
              <motion.div 
                className="app-item"
                style={{ 
                  left: `calc(50% + ${x}px - 30px)`,
                  top: `calc(50% + ${y}px - 30px)`,
                  transform: `rotate(-${rotation}deg)`, /* Counter-rotation to keep icons upright */
                  backgroundColor: app.color,
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
                whileHover={{ scale: 1.2, boxShadow: "0 0 25px white" }}
              >
                <div style={{ padding: '5px', fontSize: '10px', textAlign: 'center', color: '#fff' }}>
                   {app.name.substring(0, 1)}
                </div>
                <div className="app-name">
                  {app.name}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .logo-container {
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
        }

        .inner-glow {
          position: absolute;
          width: 50px;
          height: 50px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, white, #ff0, #f0f, #0ff);
          border-radius: 50%;
          filter: blur(10px);
          animation: pulse 4s infinite alternate;
        }

        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
        }
      `}</style>
    </main>
  );
}
