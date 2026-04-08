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
      <div className="scanlines"></div>
      
      <header className="cyber-header">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="logo-container"
          style={{ marginBottom: '10px' }}
        >
          <Image
            src="/logo.png"
            alt="Phantom Troupe Logo"
            width={80}
            height={80}
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
        
        <p className="user-tag">NODE: CHROLLO_LUCILFER_00</p>
      </header>

      <div className="visual-anchor">
          {/* Minimalist central connection dot */}
          <div className="center-point"></div>

          {/* Neural Orbit & Runic Nodes */}
          <div 
            className="orbit"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
          >
            {APPS.map((app, index) => {
              const angle = (index / APPS.length) * 360;
              const angleRad = (angle * Math.PI) / 180;
              const cos = Math.cos(angleRad);
              const sin = Math.sin(angleRad);

              return (
                <div key={app.id}>
                  <div 
                    className="neural-thread"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div className="particle" style={{ animationDelay: `${index * 0.5}s` }}></div>
                  </div>

                  <motion.div 
                    className="runic-node"
                    style={{ 
                      left: `calc(50% + (${cos} * var(--orbit-radius)) - (var(--node-size) / 2))`,
                      top: `calc(50% + (${sin} * var(--orbit-radius)) - (var(--node-size) / 2))`,
                      transform: `rotate(-${rotation}deg)`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="runic-content">{app.symbol}</div>
                    <div className="runic-name">{app.name}</div>
                  </motion.div>
                </div>
              );
            })}
          </div>
      </div>

      <style jsx global>{`
        .logo-container { filter: drop-shadow(0 0 15px rgba(0, 242, 255, 0.4)); }
        .center-point {
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 15px var(--primary);
          z-index: 20;
        }
        .black-hole-container::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0));
          background-size: 150px 150px;
          opacity: 0.05;
          pointer-events: none;
        }
      `}</style>
    </main>
  );
}
