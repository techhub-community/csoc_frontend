import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';

const MenteeWelcome = () => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Stop confetti after 10 seconds
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px]"></div>

      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={800} gravity={0.15} />}
      
      <div className="z-10 text-center space-y-8 px-4 fade-in-up-anim">
        {/* Welcome Text */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-sm mb-4">
          Welcome to CSoC 2026
        </h1>
        
        {/* Subtitle / Day text */}
        <div className="inline-block px-6 py-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm mt-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
          <p className="text-xl md:text-2xl font-medium text-green-300 tracking-wide">
            DAY 01 - Orientation of CSoC 2026
          </p>
        </div>

        {/* Enter Dashboard Button */}
        <div className="pt-12">
          <button
            onClick={() => navigate('/mentee/dashboard')}
            className="group relative px-8 py-4 bg-green-600 text-white font-bold rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] focus:ring-4 focus:ring-green-500/50"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              Go to Dashboard
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <style>{`
        .fade-in-up-anim {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MenteeWelcome;
