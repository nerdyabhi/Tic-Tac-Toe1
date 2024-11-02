// hooks/useSocket.js
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = (resetGame, setTiles, setXTurn, SetCount, SetDisable, setWinner) => {
  const [socket, setSocket] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [opponentLeftTheGame, setOpponentLeftThegame] = useState(false);
  const [playingAs, setPlayingAs] = useState(null);

  useEffect(() => {

    socket?.on("OpponentFound", (data) => {
      setOpponent(data.opponentName);
      setPlayingAs(data.playingAs);
      setXTurn(data.Xturn);
      SetDisable(!(data.playingAs === "X" && data.Xturn));
    });

    socket?.on("OpponentLeftTheGame", () => setOpponentLeftThegame(true));

    socket?.on("user_made_move_server", (data) => {
      setXTurn(data.nextTurn);
      setTiles(data.NewTiles);
      SetCount(data.count);
      SetDisable(!((playingAs === "X" && data.nextTurn === true) || (playingAs === "O" && data.nextTurn === false)));
    });

    socket?.on("user_lost_the_match", (winner) => setWinner(`${winner} Won the match..`));

    return () => {
      socket?.on("OpponentFound");
      socket?.on("OpponentLeftTheGame");
      socket?.on("user_made_move_server");
      socket?.on("user_lost_the_match");
    };
  }, [playingAs]);

  return { socket,setSocket ,  opponent, opponentLeftTheGame, playingAs  , setPlayingAs, setOpponent };
};

export default useSocket;
