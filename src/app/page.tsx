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

const WEB_LAYERS = 8; 

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.08) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="black-hole-container">
      <div className="scanlines"></div>
      
      <header className="cyber-header">
        <div className="glitch-wrapper">
          <h1 className="glitch" data-text="Phantom Troupe">
            Phantom Troupe
            <span aria-hidden="true" className="glitch-span">Phantom Troupe</span>
            <span aria-hidden="true" className="glitch-span">Phantom Troupe</span>
          </h1>
          <div className="header-accent"></div>
        </div>
      </header>

      <div className="visual-anchor">
          {/* Logo Centralized - NO OFFSETS, just absolute center */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="spider-center-anchor"
          >
            <div className="core-glow-container">
              <div className="core-glow"></div>
            </div>
            <Image
              src="/logo.png"
              alt="Phantom Troupe Logo"
              width={100}
              height={100}
              className="logo"
              priority
            />
          </motion.div>

          {/* Central Anchor Dot - The absolute center of the radial lines */}
          <div className="center-point"></div>

          {/* Rotating Spider Web Structure */}
          <div 
            className="orbit"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
          >
            {/* 1. Radial Web Lines (ALL intersect at exactly [0,0] which is top:50%, left:50%) */}
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

                  {/* 2. Concentric Web Segments */}
                  {Array.from({ length: WEB_LAYERS }).map((_, li) => {
                    const rScale = (li + 2) / (WEB_LAYERS + 2);
                    const segmentWidth = 0.5176; 
                    const segmentRotation = 105;

                    return (
                      <div 
                        key={`segment-${li}-${index}`}
                        className="web-segment"
                        style={{
                          left: `calc(50% + (${cos} * var(--orbit-radius) * ${rScale}))`,
                          top: `calc(50% + (${sin} * var(--orbit-radius) * ${rScale}))`,
                          width: `calc(var(--orbit-radius) * ${rScale} * ${segmentWidth} + 2px)`, 
                          transform: `rotate(${angle + segmentRotation}deg)`,
                          opacity: 0.15 - (li * 0.015),
                          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      ></div>
                    );
                  })}

                  <motion.div 
                    className="runic-node"
                    style={{ 
                      left: `calc(50% + (${cos} * var(--orbit-radius)) - (var(--node-size) / 2))`,
                      top: `calc(50% + (${sin} * var(--orbit-radius)) - (var(--node-size) / 2))`,
                      transform: `rotate(-${rotation}deg)`,
                    }}
                    whileHover={{ scale: 1.2, borderColor: '#00f2ff' }}
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
          position: relative;
          width: 100%;
          height: 100%;
          flex: 1;
        }
        .spider-center-anchor {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
          pointer-events: none;
        }
        .core-glow-container {
          position: absolute;
          transform: translate(-50%, -50%);
        }
        .core-glow {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0, 242, 255, 0.5), transparent 70%);
          filter: blur(25px);
          animation: core-pulse 4s infinite alternate ease-in-out;
        }
        @keyframes core-pulse {
          0% { transform: scale(0.9); opacity: 0.3; }
          100% { transform: scale(1.1); opacity: 0.7; }
        }
        .logo { 
          border-radius: 50%; 
          border: 2px solid var(--primary);
          box-shadow: 0 0 40px rgba(0, 242, 255, 0.4);
          transform: translate(-50%, -50%); /* EXACT center */
          min-width: 110px;
          min-height: 110px;
          filter: brightness(1.2) contrast(1.1);
          z-index: 101;
        }
        .center-point {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #fff;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 15px #fff;
          z-index: 200;
        }
        .web-segment {
          background: transparent;
          filter: drop-shadow(0 0 1px rgba(0, 242, 255, 0.2));
          height: 1px;
          transform-origin: left center;
        }
        .glitch-span {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>
    </main>
  );
}
