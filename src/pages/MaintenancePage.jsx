import React from 'react';
import { FaTools } from 'react-icons/fa';

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white px-4">
      <div className="text-neon mb-6">
        <FaTools size={80} className="animate-pulse shadow-[0_0_15px_rgba(57,255,20,0.5)] rounded-full p-2" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500">
        We'll be back soon!
      </h1>
      <p className="text-zinc-400 text-lg md:text-xl text-center max-w-2xl mb-8 leading-relaxed">
        The Codeshack platform is currently undergoing scheduled maintenance to improve your experience. 
        We apologize for the inconvenience and appreciate your patience. Please check back later!
      </p>
      <div className="flex space-x-3">
        <div className="h-3 w-3 bg-neon rounded-full animate-bounce shadow-[0_0_8px_rgba(57,255,20,0.8)]" style={{ animationDelay: '0s' }}></div>
        <div className="h-3 w-3 bg-neon rounded-full animate-bounce shadow-[0_0_8px_rgba(57,255,20,0.8)]" style={{ animationDelay: '0.2s' }}></div>
        <div className="h-3 w-3 bg-neon rounded-full animate-bounce shadow-[0_0_8px_rgba(57,255,20,0.8)]" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default MaintenancePage;
