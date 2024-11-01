// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { io } from "socket.io-client";

// const socket = io('http://localhost:5000', { autoConnect: false });


// const Game = () => {
    // const { roomId: paramRoomId } = useParams();
//     const roomId = paramRoomId.toLowerCase();
//     const [length, setLength] = useState(0);

    
//        useEffect(() => {
//             if (!socket.connected) {
//                 socket.connect();
//             }

//             return () => {
//                 if (socket.connected) {
//                     socket.disconnect();
//                 }
//             };
//         }, []);

//     useEffect(() => {
//         console.log("useEffect called");

//         socket.emit('getRoom', roomId);

//         const handleAllRooms = (room) => {
//             console.log(room);
//             setLength(Array.isArray(room.players) ? room.players.length : 0); // Ensure room.players is an array
//         };

//         const handleError = (error) => {
//             alert(error);
//         };

//         socket.on('allRooms', handleAllRooms);
//         socket.on('error', handleError);

//         // Cleanup to prevent memory leaks
//         return () => {
//             socket.off('allRooms', handleAllRooms);
//             socket.off('error', handleError);
//         };
//     }, [roomId]); // Add roomId as dependency

//     return (
//         <>
//             <p>Hey there, I am the Game component. Nice to meet you.</p>
//             <h1>Your Room ID is: {roomId}</h1>
//             <h1>{length}</h1>
//             <button className="btn">Click me</button>

//             {length < 2 ? (
//                 <h1>Finding Other Players...</h1>
//             ) : (
//                 <h1>All Players Are Connected</h1>
//             )}
//         </>
//     );
// };

// export default Game;


const Game = ()=>{
    return (
        <>
            <h1>Lol , Game Page</h1>
        </>
    )
}

export default Game;