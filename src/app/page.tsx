'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/* ===================== CONFETTI ===================== */

type ConfettiPiece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
};

const colors = ['#ff6b9d', '#c44569', '#f8b195', '#ffd89b', '#6bcf7f', '#a78bfa', '#60a5fa'];

const Confetti = () => {
  const [confetti] = useState<ConfettiPiece[]>(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2.5 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  );

  return (
    <>
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="fixed w-2.5 h-2.5 md:w-3 md:h-3 pointer-events-none rounded-full"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            animation: `fall ${piece.duration}s linear ${piece.delay}s infinite`,
            backgroundColor: piece.color,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        />
      ))}
    </>
  );
};

/* ===================== PAGE ===================== */

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/Images/Sister.jpeg',
    '/Images/Folake2.jpeg',
    '/Images/Folake3.jpeg',
  ];

  const prayers = [
    "May God continue to bless you with good health.❤️",
    "May you continue to make your parents proud.❤️",
    "May your children be proud to call you mummy.❤️",
     "May your Prayers be answered.❤️",
    "Your home is blessed.❤️",
    "I hope this gift of skill puts a smile on your face. ❤️",
     "I hope this goes a long way. ❤️",

  ];

  const [prayerIndex, setPrayerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrayerIndex((prev) => (prev + 1) % prayers.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [prayers.length]);

  return (
    <div className="relative w-full h-dvh overflow-hidden ">

      {/* Background Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Birthday moment ${index + 1}`}
              fill
              className="object-cover brightness-[0.85] contrast-[1.05]"
              priority={index === 0}
              quality={85}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      </div>

      {/* Confetti */}
      <Confetti />

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-8">

        {/* Headline */}
        <div className="mb-10 md:mb-16 space-y-4 md:space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 animate-pulse">
              HAPPY
            </span>
            <br className="sm:hidden" />
            <span className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"> 35TH </span>

            {/* 🎂 SPINNING CAKE */}
            <span className="inline-block text-6xl sm:text-8xl md:text-9xl animate-[spin_5s_linear_infinite] drop-shadow-xl">
              🎂
            </span>
          </h1>
        </div>

        {/* Messages */}
        <div className="space-y-6 mt-20 max-w-3xl">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white drop-shadow-lg">
            A Special Person On her <span className="text-pink-300 font-bold">Special Day</span>!
          </p>

          <p className="mt-10 text-xl sm:text-2xl md:text-3xl font-bold text-yellow-100 drop-shadow-md animate-[bounce_4s_infinite]">
            35 years of God&apos;s <span className="text-yellow-300">Grace</span>! ✨
          </p>
        </div>

        {/* ROTATING PRAYER TEXT */}
        <p className="mt-10 text-lg sm:text-xl md:text-2xl text-white/90 font-medium italic mb-16 md:mb-20  animate-fade">
          {prayers[prayerIndex]}
        </p>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 flex justify-center gap-3">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2.5 sm:h-3 rounded-full transition-all duration-700 ${
                index === currentImageIndex
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 w-10 sm:w-12 shadow-lg shadow-pink-500/40'
                  : 'bg-white/40 w-2.5 sm:w-3'
              }`}
            />
          ))}
        </div>
      </div>

      {/* GLOBAL ANIMATIONS */}
      <style jsx global>{`
        @keyframes fall {
          to {
            transform: translateY(100dvh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fade {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-10px); }
        }

        .animate-fade {
          animation: fade 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
