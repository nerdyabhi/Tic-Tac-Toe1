import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import WaitingScreen from './WaitingScreen';
import useSocket from '../hooks/useSocket';
const URL = "https://backendfortictactoe-production.up.railway.app";

const Lobby = () => {

  const [roomId, setRoomId] = useState(null);
  const [joinRoom, setJoinRoom] = useState(true);
  const [isPlayOnline , setPlayOnline] = useState(false);
  const [isWaiting , setIsWaiting] = useState(false);
  const [playerName , setPlayerName] = useState(null);

  
  useEffect(()=>{
    const playerNameFromLocalStorage = localStorage.getItem("player-name");
    if(playerNameFromLocalStorage) setPlayerName(playerNameFromLocalStorage); 
  } , [])


  const playerNameSubmitHandle = (e)=>{
    e.preventDefault();
    let name = (e.target.elements[0].value);
    localStorage.setItem("player-name", name);
    setPlayerName(name);
  }

  const SearchOnlinePlayerhandler = ()=>{
    setPlayOnline(true);
    const newSocket = io(URL, {
        autoConnect: true,
      });

      newSocket?.emit("request_to_play", {
        playerName: playerName,
      });

      setSocket(newSocket);
  }

  const {socket , setSocket,  opponent, opponentLeftTheGame, playingAs }  = useSocket(resetGame,tiles,  setTiles, setXTurn, SetCount, SetDisable, setWinner);


  if(isWaiting){
    return <WaitingScreen/>
  }



  if(!playerName){
    return (
      <div className="flex flex-col justify-center items-center h-[100vh] w-[100vw]">
          <form className="flex flex-col gap-3" action="" onSubmit={(e)=>playerNameSubmitHandle(e)}>
      <h1 className="font-bold text-sm text-center">We Need Your Name</h1>
      <h1 className="font-bold text-lg text-center">We Need Your Name</h1>
      <label className="input input-bordered flex items-center gap-2">
        Your Name:
        <input
        type="text"
        className="grow"
        placeholder="Nerdy Abhi"
        required
        />
      </label>
      <button type='submit' className='border border-white py-2 px-3 rounded-xl shadow-sm shadow-blue-500'>Submit</button>
      </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] gap-5">
      <h1>Hey {playerName}</h1>
      {joinRoom ? (
        <form className="flex flex-col gap-3" action="">
          <h1 className="font-bold text-xl mb-2 text-center">Join a Room</h1>
          <label className="input input-bordered flex items-center gap-2">
            Room Id:
            <input
              type="text"
              className="grow"
              placeholder="69xx69"
              onChange={(e) => setRoomId(e.target.value)}
             required/>
          </label>
          <button type="submit" className="btn border-slate-400" onClick={handleJoinRoom}>
            Join
          </button>
          <h1 className="link link-secondary" onClick={() => setJoinRoom(false)}>
            Create a Room?
          </h1>
        </form>
      ) : (
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl mb-2 text-center">Create a Room</h1>
          <button className="btn border-gray-900 w-[300px]" onClick={createARoom}>
            Create a room
          </button>
          <h1 className="link link-secondary" onClick={() => setJoinRoom(true)}>
            Join a Room?
          </h1>
        </div>
      )}

      <h1>OR</h1>
      <div className="flex">
        <button className="btn border-gray-900"  onClick={SearchOnlinePlayerhandler}>
          Search For Players Online
        </button>
      </div>

    </div>

    
  );
};

export default Lobby;
