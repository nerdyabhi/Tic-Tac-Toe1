// hooks/useSocket.js
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = (resetGame, setTiles, setXTurn, SetCount, SetDisable, setWinner) => {
  const [socket, setSocket] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [opponentLeftTheGame, setOpponentLeftThegame] = useState(false);
  const [playingAs, setPlayingAs] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { autoConnect: true });
    setSocket(newSocket);

    newSocket.on("OpponentFound", (data) => {
      setOpponent(data.opponentName);
      setPlayingAs(data.playingAs);
      setXTurn(data.Xturn);
      SetDisable(!(data.playingAs === "X" && data.Xturn));
    });

    newSocket.on("OpponentLeftTheGame", () => setOpponentLeftThegame(true));

    newSocket.on("user_made_move_server", (data) => {
      setXTurn(data.nextTurn);
      setTiles(data.NewTiles);
      SetCount(data.count);
      SetDisable(!((playingAs === "X" && data.nextTurn === true) || (playingAs === "O" && data.nextTurn === false)));
    });

    newSocket.on("user_lost_the_match", (winner) => setWinner(`${winner} Won the match..`));

    return () => {
      newSocket.off("OpponentFound");
      newSocket.off("OpponentLeftTheGame");
      newSocket.off("user_made_move_server");
      newSocket.off("user_lost_the_match");
    };
  }, [playingAs]);

  return { socket, opponent, opponentLeftTheGame, playingAs };
};

export default useSocket;
