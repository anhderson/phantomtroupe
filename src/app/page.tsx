'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const APPS = [
  { id: 1, name: "Discord", color: "#5865F2", symbol: "D" },
  { id: 2, name: "Spotify", color: "#1DB954", symbol: "S" },
  { id: 3, name: "Visual Code", color: "#007ACC", symbol: "V" },
  { id: 4, name: "GitHub", color: "#181717", symbol: "G" },
  { id: 5, name: "YouTube", color: "#FF0000", symbol: "Y" },
  { id: 6, name: "Chrome", color: "#4285F4", symbol: "C" },
  { id: 7, name: "Slack", color: "#4A154B", symbol: "K" },
  { id: 8, name: "Figma", color: "#F24E1E", symbol: "F" },
  { id: 9, name: "Notion", color: "#000000", symbol: "N" },
  { id: 10, name: "Steam", color: "#000000", symbol: "T" },
  { id: 11, name: "Postman", color: "#FF6C37", symbol: "P" },
  { id: 12, name: "Docker", color: "#2496ED", symbol: "M" },
];

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.05) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="black-hole-container">
      {/* Visual Overlay Layers */}
      <div className="scanlines"></div>
      
      {/* Cyber Header */}
      <header className="cyber-header">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="logo-container"
          style={{ marginBottom: '20px' }}
        >
          <Image
            src="/logo.png"
            alt="Phantom Troupe Logo"
            width={100}
            height={100}
            className="logo"
            priority
          />
        </motion.div>
        
        <div className="glitch-wrapper">
          <h1 className="glitch" data-text="Phantom Troupe">
            Phantom Troupe
            <span aria-hidden="true">Phantom Troupe</span>
            <span aria-hidden="true">Phantom Troupe</span>
          </h1>
          <div className="header-accent"></div>
        </div>
        
        <p className="user-tag">
          NODE: CHROLLO_LUCILFER_00
        </p>
      </header>

      {/* Visual Anchor to center the black hole group below the name */}
      <div className="visual-anchor">
          {/* Central Black Hole - Transcendental Event Horizon */}
          <div className="event-horizon"></div>
          <div className="black-hole-core">
            <div className="inner-glow"></div>
          </div>

          {/* Neural Orbit & Runic Nodes */}
          <div 
            className="orbit"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
          >
            {APPS.map((app, index) => {
              const angle = (index / APPS.length) * 360;
              const radius = 350;
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);

              return (
                <div key={app.id}>
                  {/* Neural Thread Connection */}
                  <div 
                    className="neural-thread"
                    style={{ 
                      transform: `rotate(${angle}deg)`,
                      width: `${radius}px`
                    }}
                  >
                    <div className="particle" style={{ animationDelay: `${index * 0.5}s` }}></div>
                  </div>

                  {/* Hex-Runic Node */}
                  <motion.div 
                    className="runic-node"
                    style={{ 
                      left: `calc(50% + ${x}px - 35px)`,
                      top: `calc(50% + ${y}px - 35px)`,
                      transform: `rotate(-${rotation}deg)`,
                    }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="runic-content">{app.symbol}</div>
                    <div className="runic-name">
                      {app.name}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
      </div>


      <style jsx global>{`
        .logo-container {
          filter: drop-shadow(0 0 15px rgba(0, 242, 255, 0.4));
        }

        .inner-glow {
          position: absolute;
          width: 80px;
          height: 80px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, #fff, #00f2ff, transparent);
          border-radius: 50%;
          filter: blur(20px);
          animation: pulse 3s infinite alternate cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }

        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.8; }
        }

        /* Ambient Mysterious Particles */
        .black-hole-container::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0));
          background-size: 200px 200px;
          animation: ambient-drift 30s linear infinite;
          opacity: 0.1;
          pointer-events: none;
        }

        @keyframes ambient-drift {
          from { background-position: 0 0; }
          to { background-position: 1000px 1000px; }
        }
      `}</style>
    </main>
  );
}
