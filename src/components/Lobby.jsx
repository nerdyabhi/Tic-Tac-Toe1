import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');
const Lobby = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [joinRoom, setJoinRoom] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('getAllRooms');
    });

    socket.on('allRooms', (rooms) => setAvailableRooms(rooms));

  }, []);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit('join-room', roomId);

    socket.off('error').on('error', (error) => console.log(error));

    socket.off('room-joined').on('room-joined', () => {
      console.log('Successfully joined room');
      navigate(`/game/${roomId}`);
    });
  };

  const searchForPlayers = () => {
    const newRoomId = nanoid();
    setRoomId(newRoomId); // Update state with the new room ID.

    socket.emit('create-room', newRoomId);

    socket.off('room-created').on('room-created', () => {
      console.log('Room created with ID:', newRoomId);
      navigate(`/game/${newRoomId}`);
    });
  };

  const createARoom = (e) => {
    e.preventDefault();
    const newRoomId = nanoid(5);
    setRoomId(newRoomId); // Set the new room ID.
    socket.emit('join-room', newRoomId);
    navigate("/game/"+newRoomId);
    socket.off('error').on('error', (error) => console.log(error));
  };

  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] gap-5">
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
        <button className="btn border-gray-900" onClick={searchForPlayers}>
          Search For Players Online
        </button>
      </div>

      {availableRooms.map((room) => (
        <h1 key={room[0]}>{room[0]}</h1>
      ))}
    </div>
  );
};

export default Lobby;
