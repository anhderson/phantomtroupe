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
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.08) % 360);
    }, 50);

    // After 4 seconds, the web is "complete"
    const timer = setTimeout(() => setIsComplete(true), 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
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
          {/* Logo Offset - Slightly down and to the right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, x: "50%", y: "50%" }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              top: "51.5%", // Slightly down
              left: "51.5%", // Slightly right
              x: "-50%",
              y: "-50%"
            }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="spider-center-anchor"
          >
            <div className="core-glow"></div>
            <Image
              src="/logo.png"
              alt="Phantom Troupe Logo"
              width={90}
              height={90}
              className="logo"
              priority
            />
          </motion.div>

          {/* Central Anchor Dot */}
          <div className="center-point"></div>

          {/* Rotating Spider Web Structure */}
          <div 
            className="orbit"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
          >
            {/* 1. Radial Web Lines with "Growth" animation */}
            {APPS.map((app, index) => {
              const angle = (index / APPS.length) * 360;
              const angleRad = (angle * Math.PI) / 180;
              const cos = Math.cos(angleRad);
              const sin = Math.sin(angleRad);

              return (
                <div key={`radial-${index}`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: 'var(--orbit-radius)' }}
                    transition={{ delay: index * 0.1, duration: 1.5, ease: "easeOut" }}
                    className="neural-thread"
                    style={{ 
                      transform: `rotate(${angle}deg)` 
                    }}
                  >
                    <div className="particle" style={{ animationDelay: `${index * 0.4}s` }}></div>
                  </motion.div>

                  {/* 2. Concentric Web Segments with "Growth" animation */}
                  {Array.from({ length: WEB_LAYERS }).map((_, li) => {
                    const rScale = (li + 2) / (WEB_LAYERS + 2);
                    const segmentWidth = 0.5176;
                    const segmentRotation = 105;

                    return (
                      <motion.div 
                        key={`segment-${li}-${index}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: 0.15 - (li * 0.015),
                          scale: 1
                        }}
                        transition={{ 
                          delay: 1.5 + (li * 0.2) + (index * 0.05), 
                          duration: 0.8 
                        }}
                        className="web-segment"
                        style={{
                          left: `calc(50% + (${cos} * var(--orbit-radius) * ${rScale}))`,
                          top: `calc(50% + (${sin} * var(--orbit-radius) * ${rScale}))`,
                          width: `calc(var(--orbit-radius) * ${rScale} * ${segmentWidth} + 2px)`,
                          transform: `rotate(${angle + segmentRotation}deg)`,
                          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      ></motion.div>
                    );
                  })}

                  {/* 3. Application Nodes */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5 + (index * 0.1) }}
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
          z-index: 100;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }
        .core-glow {
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(0, 242, 255, 0.5), transparent 70%);
          filter: blur(25px);
          animation: core-pulse 4s infinite alternate ease-in-out;
        }
        @keyframes core-pulse {
          0% { transform: scale(0.9); opacity: 0.2; }
          100% { transform: scale(1.15); opacity: 0.6; }
        }
        .logo { 
          border-radius: 50%; 
          border: 1px solid var(--primary);
          box-shadow: 0 0 30px rgba(0, 242, 255, 0.3);
          min-width: 90px;
          min-height: 90px;
          filter: brightness(1.1) contrast(1.1);
          z-index: 101;
        }
        .center-point {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px #fff;
          z-index: 200;
          opacity: 0.5;
        }
        .web-segment {
          background: transparent;
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
