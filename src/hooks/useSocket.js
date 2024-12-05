// hooks/useSocket.js
import { useState, useEffect } from 'react';

const useSocket = (resetGame, tiles , setTiles, setXTurn, SetCount, setWinner , disabled) => {
  const [socket, setSocket] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [opponentLeftTheGame, setOpponentLeftThegame] = useState(false);
  const [playingAs, setPlayingAs] = useState(null);

  useEffect(() => {

    socket?.on("user_made_move_server", (data) => {

      setXTurn(data.nextTurn);
      setTiles(data.newTiles);
      SetCount(data.count);
      console.log(data.playingAs , data.nextTurn);
      console.log("Hey , Count got updated to " , data.count);
      
      
      if((playingAs == "X" && !data.nextTurn ) || playingAs ==="O" && data.nextTurn ){
        disabled.current = true;
      }
      else disabled.current = false;
    });

    return () => {
      socket?.off("user_made_move_server");
      socket?.off("user_lost_the_match");
    };
  }, [playingAs, tiles , socket ]);

  useEffect(()=>{
    socket?.on("OpponentFound", (data) => {
      console.log("Opponent Found and data is : " , data);

      setOpponent(data.opponentName);
      setPlayingAs(data.playingAs);
      setXTurn(data.Xturn);

      if((data.playingAs === "X" && !data.Xturn ) || data.playingAs === "O" && data.Xturn)
      {
        console.log(data.playingAs , "and hence disabled the board.");
        disabled.current = true;
      }
    });

    socket?.on("OpponentLeftTheGame", () => setOpponentLeftThegame(true));

    return ()=>{
      socket?.off("OpponentFound");
      socket?.off("OpponentLeftTheGame");
    }
  }, [socket])


  return { socket , setSocket ,  opponent, opponentLeftTheGame, playingAs  , setPlayingAs, setOpponent };
};




export default useSocket;
