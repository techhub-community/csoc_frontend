import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="flex flex-col items-center">
        <div className="flex space-x-3">
          <div className="w-4 h-12 bg-gray-600 animate-bounce"></div>
          <div className="w-4 h-[28px] bg-neon animate-ping"></div>
          <div className="w-4 h-16 bg-red-500 animate-bounce"></div>
        </div>
        <p className="text-lg text-zinc-400 mt-4">loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
