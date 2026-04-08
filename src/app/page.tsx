'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const APPS = [
  { id: 1, name: "Discord", symbol: "D" },
  { id: 2, name: "Spotify", symbol: "S" },
  { id: 3, name: "Visual Code", symbol: "V" },
  { id: 4, name: "GitHub", symbol: "G" },
  { id: 5, name: "YouTube", symbol: "Y" },
  { id: 6, name: "Chrome", symbol: "C" },
  { id: 7, name: "Slack", symbol: "K" },
  { id: 8, name: "Figma", symbol: "F" },
  { id: 9, name: "Notion", symbol: "N" },
  { id: 10, name: "Steam", symbol: "T" },
  { id: 11, name: "Postman", symbol: "P" },
  { id: 12, name: "Docker", symbol: "M" },
];

const WEB_RINGS = [1.2, 0.9, 0.6, 0.3]; // Relative to orbit-radius

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="black-hole-container">
      <div className="scanlines"></div>
      
      <header className="cyber-header">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
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
          {/* Static Anchor Thread to the Spider */}
          <div className="silk-thread"></div>

          {/* Central Anchor Dot */}
          <div className="center-point"></div>

          {/* Rotating Spider Web Structure */}
          <div 
            className="orbit"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
          >
            {/* 1. Radial Web Lines */}
            {APPS.map((app, index) => {
              const angle = (index / APPS.length) * 360;
              const angleRad = (angle * Math.PI) / 180;
              const cos = Math.cos(angleRad);
              const sin = Math.sin(angleRad);

              return (
                <div key={`radial-${index}`}>
                  <div 
                    className="neural-thread"
                    style={{ 
                      width: 'var(--orbit-radius)',
                      transform: `rotate(${angle}deg)` 
                    }}
                  >
                    <div className="particle" style={{ animationDelay: `${index * 0.4}s` }}></div>
                  </div>

                  {/* 2. Concentric Web Segments (Rings) */}
                  {WEB_RINGS.map((rScale, ri) => {
                    const nextAngle = ((index + 1) / APPS.length) * 360;
                    const nextAngleRad = (nextAngle * Math.PI) / 180;
                    
                    return (
                      <div 
                        key={`ring-${ri}-${index}`}
                        className="web-segment"
                        style={{
                          left: `calc(50% + (${cos} * var(--orbit-radius) * ${rScale}))`,
                          top: `calc(50% + (${sin} * var(--orbit-radius) * ${rScale}))`,
                          width: `calc(var(--orbit-radius) * ${rScale} * 0.52)`, // 2 * sin(15deg) approx 0.52
                          transform: `rotate(${angle + 105}deg)`, // Perpendicular + offset to connect
                          opacity: 0.2 - (ri * 0.04)
                        }}
                      ></div>
                    );
                  })}

                  {/* 3. Application Nodes (Caught in the Web) */}
                  <motion.div 
                    className="runic-node"
                    style={{ 
                      left: `calc(50% + (${cos} * var(--orbit-radius)) - (var(--node-size) / 2))`,
                      top: `calc(50% + (${sin} * var(--orbit-radius)) - (var(--node-size) / 2))`,
                      transform: `rotate(-${rotation}deg)`,
                    }}
                    whileHover={{ scale: 1.15, borderColor: '#00f2ff' }}
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
        .visual-anchor {
          margin-top: 40px; /* Space for the silk thread */
        }
        .web-segment {
          background: rgba(255, 255, 255, 0.15);
          filter: drop-shadow(0 0 2px rgba(0, 242, 255, 0.1));
        }
        .black-hole-container::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(1px 1px at 20px 30px, rgba(0, 242, 255, 0.1), transparent);
          background-size: 100px 100px;
          opacity: 0.1;
          pointer-events: none;
        }
      `}</style>
    </main>
  );
}
