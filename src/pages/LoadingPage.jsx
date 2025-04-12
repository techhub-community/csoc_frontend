import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="flex flex-col items-center">
        <div className="flex space-x-3">
          <div className="w-4 h-12 bg-gray-600 animate-bounce"></div>
          <div className="w-4 h-[28px] bg-orange-400 animate-ping"></div>
          <div className="w-4 h-16 bg-red-500 animate-bounce"></div>
        </div>
        <p className="text-lg text-gray-500 mt-4">loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
