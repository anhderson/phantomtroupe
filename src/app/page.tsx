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

const WEB_RINGS = [1.2, 0.9, 0.6, 0.3];

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
          {/* Logo Centralized - The Core Anchor */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="spider-center-anchor"
          >
            <div className="core-glow"></div>
            <Image
              src="/logo.png"
              alt="Phantom Troupe Logo"
              width={100}
              height={100}
              className="logo"
              priority
            />
          </motion.div>

          {/* Shared Center Point */}
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
                    return (
                      <div 
                        key={`ring-${ri}-${index}`}
                        className="web-segment"
                        style={{
                          left: `calc(50% + (${cos} * var(--orbit-radius) * ${rScale}))`,
                          top: `calc(50% + (${sin} * var(--orbit-radius) * ${rScale}))`,
                          width: `calc(var(--orbit-radius) * ${rScale} * 0.52)`,
                          transform: `rotate(${angle + 105}deg)`,
                          opacity: 0.12 - (ri * 0.02)
                        }}
                      ></div>
                    );
                  })}

                  {/* 3. Application Nodes */}
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
        /* Override display flex in globals.css if necessary */
        .visual-anchor {
          position: relative;
          width: 100%;
          flex: 1;
          display: block !important; /* Ensure it's not flex to avoid centring ambiguity */
          min-height: 0;
        }
        .spider-center-anchor {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%); /* Center the 0x0 point */
          z-index: 100;
          pointer-events: none;
        }
        .core-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0, 242, 255, 0.4), transparent 70%);
          filter: blur(40px);
          transform: translate(-50%, -50%); /* Centered on the 0x0 point */
          animation: core-pulse 4s infinite alternate ease-in-out;
        }
        @keyframes core-pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
        }
        .logo { 
          border-radius: 50%; 
          border: 2px solid var(--primary);
          box-shadow: 0 0 30px rgba(0, 242, 255, 0.3);
          transform: translate(-50%, -50%); /* Centered on the 0x0 point */
          min-width: 100px;
          min-height: 100px;
          pointer-events: auto;
        }
        .center-point {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
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
