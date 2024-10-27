const WinScreen = ({ Winner, resetGame }) => {
    return (
        <div className="z-10 absolute flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br bg-gray-900 bg-opacity-90">
            <div className="text-center p-8 bg-white bg-opacity-10 rounded-lg shadow-2xl backdrop-blur-sm transition-transform transform hover:scale-105">
                <h1 className="text-6xl font-extrabold text-white mb-4 animate-bounce">
                    {Winner === "Draw" ? "It's a Draw!" : `${Winner} Wins! 🎉`}
                </h1>
                <p className="text-white text-lg mb-6 animate-fadeIn">
                    Great Game! Play Again?
                </p>
                <button
                    className="px-6 py-3 btn text-white text-xl font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl focus:outline-none"
                    onClick={resetGame}
                >
                    New Game
                </button>
            </div>
        </div>
    );
};

export default WinScreen;
