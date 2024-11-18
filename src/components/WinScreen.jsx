import React from 'react';
import { Trophy, RefreshCw, RotateCcw } from 'lucide-react';

const WinningGif = ({ Winner }) => {
    const gifSrc = Winner === "Draw"
        ? "https://nerdyabhi.github.io/tic-tac-toe/asset/memeGameDraw.gif"
        : Winner === "X" ? "https://nerdyabhi.github.io/tic-tac-toe/asset/memeWin.webp" : "https://nerdyabhi.github.io/tic-tac-toe/asset/machineWins.webp";

    return (
        <img
            src={gifSrc}
            alt="Game Result"
            className="md:w-64 md:h-64 w-32 h-32 mb-6  rounded-lg "
        />
    );
};

const WinScreen = ({ Winner, resetGame }) => {
    return (
        <div className="flex flex-col  w-[100vw] h-[100vh] justify-center items-center min-h-screen bg-zinc-900 absolute">
          
            <div className="relative  flex flex-col items-center text-center space-y-8 p-12 rounded-2xl z-10 bg-slate-900 ">
            
                {/* Game result announcement */}
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent tracking-wider">
                    {Winner === "Draw" ? "It's a Draw!" : `${Winner} Wins!`}
                </h1>

            

                <WinningGif Winner={Winner} />

                {/* Game control buttons */}
                <div className="flex gap-6 justify-center items-center">
                <button className="btn w-[225px] border-2 border-white hover:scale-105 transition-all duration-200" onClick={resetGame} >Play Again</button>
                <button className="btn w-[225px] border-2 border-white hover:scale-105 transition-all duration-200" onClick={resetGame} >Play Again</button>
                  
                </div>
            </div>

           </div>
    );
};

export default WinScreen;
