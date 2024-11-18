import { Trophy, RefreshCw, RotateCcw, PartyPopper } from 'lucide-react';

const WinningGif = ({ Winner }) => {
    const gifSrc = Winner === "Draw"
        ? "https://nerdyabhi.github.io/tic-tac-toe/asset/memeGameDraw.gif"
        : Winner ==="X"?"https://nerdyabhi.github.io/tic-tac-toe/asset/memeWin.webp":"https://nerdyabhi.github.io/tic-tac-toe/asset/machineWins.webp";

    return (
        <img 
            src={gifSrc}
            alt="Game Result"
            className="w-64 h-64 mb-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        />
    );
};

const WinScreen = ({ Winner, resetGame }) => {
    return (
        <div className="z-10 absolute flex flex-col items-center justify-center h-screen w-screen bg-gray-900 bg-opacity-95">
            <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-700 flex flex-col items-center gap-4 animate-fadeIn"></div>
                <div className="flex items-center gap-3">
                    {Winner === "Draw" ? (
                        <PartyPopper className="w-12 h-12 text-yellow-400 animate-bounce" />
                    ) : (
                        <Trophy className="w-12 h-12 text-yellow-400 animate-pulse" />
                    )}
                    <h1 className="text-6xl font-extrabold text-white mb-4">
                        {Winner === "Draw" ? "It's a Draw!" : `${Winner} Wins! 🏆`}
                    </h1>
                </div>

                <WinningGif Winner={Winner} />
                
                <p className="text-gray-300 text-xl mb-8 flex items-center gap-2">
                    Congratulations! What would you like to do next?
                </p>
                <div className="flex gap-4 justify-center items-center">
                    <button
                        className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 flex items-center gap-2"
                        onClick={resetGame}
                    >
                        <RefreshCw className="w-5 h-5 animate-spin-slow" />
                        Play Again
                    </button>
                    <button
                        className="px-6 py-3 bg-gray-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition-all transform hover:scale-105 flex items-center gap-2"
                        onClick={() => window.location.reload()}
                    >
                        <RotateCcw className="w-5 h-5" />
                        Reset Score
                    </button>
                </div>
            </div>

    );
};

export default WinScreen;
