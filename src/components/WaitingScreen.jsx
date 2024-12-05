import React from 'react';

const WaitingScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      {/* Animated backdrop */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,0,100,0.2),rgba(0,0,0,1))] animate-pulse" />

      {/* Red warning light effect */}
      <div className="fixed inset-0 bg-red-900/5 animate-pulse [animation-duration:4s]" />

      {/* Main content container */}
      <div className="relative text-center space-y-8 p-12 rounded-xl z-10">
        {/* X and O symbols */}
        <div className="flex justify-center mb-8 space-x-24 relative">
          {/* X Symbol */}
          <div className="text-6xl font-bold text-red-600 animate-pulse rotate-12 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            X
          </div>
          {/* O Symbol */}
          <div className="text-6xl font-bold text-red-600 animate-pulse [animation-delay:1s] -rotate-12 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            O
          </div>
        </div>



        {/* Title with glowing effect */}
        <h1 className="text-4xl font-bold text-red-500 uppercase tracking-wider drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">
          Waiting for Opponent
        </h1>

        {/* Dramatic dots */}
        <div className="flex justify-center space-x-3">
          <span className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s] shadow-lg shadow-red-500/50" />
          <span className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s] shadow-lg shadow-red-500/50" />
          <span className="w-3 h-3 bg-red-600 rounded-full animate-bounce shadow-lg shadow-red-500/50" />
        </div>

        {/* Game-specific message */}
        <p className="text-red-400 text-sm animate-pulse font-medium tracking-widest uppercase">
          Your move will be next
        </p>
      </div>

      {/* Animated corner elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        {/* Mini X in top left */}
        <div className="absolute top-8 left-8 text-4xl text-red-900/20 animate-pulse rotate-12">X</div>
        {/* Mini O in bottom right */}
        <div className="absolute bottom-8 right-8 text-4xl text-red-900/20 animate-pulse [animation-delay:-0.5s] -rotate-12">O</div>
      </div>

      {/* Scanlines effect */}
      <div className="fixed inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none" />
    </div>
  );
};

export default WaitingScreen;