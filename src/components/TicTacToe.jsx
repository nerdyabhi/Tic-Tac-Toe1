// TicTacToe.js
import { useEffect, useState } from 'react';
import Board from './Board';
import GamePlayOptions from './GamePlayOptions';
import WinScreen from './WinScreen';
import Footer from './Footer';
import { nanoid } from 'nanoid';
import useSocket from '../hooks/useSocket';
import { winningPatterns } from '../utils/constants';
import { AImove, EasyMode, MediumMode } from '../utils/gameFunctions';

const TicTacToe = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [XTurn, setXTurn] = useState(true);
  const [count, SetCount] = useState(0);
  const [aiMode, SetAIMode] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [disabled, SetDisable] = useState(false);
  const [Winner, setWinner] = useState(null);
  const [players, setPlayerName] = useState(["Abhi", "Aitrika"]);
  const [isPlayOnline, setIsPlayOnline] = useState(false);



  const handleClick = (index) => {
    const newTiles = [...tiles];
    if (newTiles[index] || Winner || disabled) return;
    newTiles[index] = XTurn ? "X" : "O";
    setTiles(newTiles);
    SetCount(count + 1);
    setXTurn(!XTurn);

    if (isPlayOnline && opponent) {
      SetDisable(true);
      socket?.emit("user_made_move_client", { newTiles, nextTurn: !XTurn, count: count + 1 });
    }
  };

  const checkWinner = () => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
        setWinner(tiles[a]);
        return;
      }
    }
    if (count === 9) setWinner("Game draw.");
  };

  const handleKeyDownMove = (e) => {
    if (disabled) return;
    const key = Number(e.key);
    if (key >= 1 && key <= 9) handleClick(key - 1);
  };

  const resetGame = () => {
    setTiles(Array(9).fill(null));
    SetCount(0);
    setWinner(null);
    SetDisable(false);
  };

  const { socket, opponent, opponentLeftTheGame, playingAs } = useSocket(
    resetGame,
    setTiles,
    setXTurn,
    SetCount,
    SetDisable,
    setWinner
  );

  useEffect(() => {
    if (count >= 5) checkWinner();

    if (aiMode && !XTurn) {
      SetDisable(true);
      const index = gameMode === "easy" ? EasyMode(tiles) : gameMode === "medium" ? MediumMode(tiles) : AImove(tiles);
      setTimeout(() => {
        SetDisable(false);
        handleClick(index);
      }, 1000);
    }

    if (aiMode) setPlayerName([players[0], "Jarvis"]);
  }, [tiles]);

  const playOnlineHandler = () => {
    resetGame();
    setIsPlayOnline(true);
    socket?.emit("request_to_play", { playerName: nanoid(4) });
  };

  const styleColor = XTurn ? "text-red-500" : "text-green-500";

  if (!opponent && isPlayOnline) return <h1 className='text-center'>Waiting for opponent</h1>;
  if (opponent && opponentLeftTheGame) return <h1>Opponent Left the Game</h1>;

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-[100vh]'>
      <h1 className='text-3xl font-semibold'>Tic Tac Toe</h1>
      <h1 className={`${styleColor} md:text-xl text-lg font-bold`}>
        {XTurn ? `${players[0]}'s turn` : `${players[1]}'s turn`}
      </h1>
      {playingAs && <h1>Playing As : {playingAs}</h1>}
      {!isPlayOnline && !aiMode && <p className='text-white'>Playing with a friend</p>}
      {!isPlayOnline && gameMode && aiMode && (
        <button className='btn' onClick={() => setGameMode(null)}>
          {gameMode.toUpperCase()} <kbd className='kbd kbd-sm'>K</kbd>
        </button>
      )}
      {isPlayOnline && opponent && <h1>Opponent Found! {opponent} playing as {playingAs}</h1>}
      <Board Winner={Winner} handleClick={handleClick} tiles={tiles} disabled={disabled} XTurn={XTurn}/>
      {!isPlayOnline && <GamePlayOptions aiMode={aiMode} SetAIMode={SetAIMode} resetGame={resetGame} gameMode={gameMode} setGameMode={setGameMode} />}
      {Winner && <WinScreen Winner={Winner} resetGame={resetGame}/>}
      {!isPlayOnline && <button className="btn w-[225px]" onClick={playOnlineHandler}>Play Online</button>}
      <Footer />
    </div>
  );
};

export default TicTacToe;
