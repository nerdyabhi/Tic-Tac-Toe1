import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { io } from "socket.io-client";

const socket = io('http://localhost:5000');
const length =0;
const Game = ()=>{

    let { roomId } = useParams();
    roomId = roomId.toLowerCase()
    useEffect(() => {
        console.log("useEffect called");
        
          socket.emit('getRoom' , roomId);

        socket.on('allRooms', (room) => {
            console.log(room);
            
        });


        socket.on("error" , (error)=>{
            alert(error);
        })
    
      }, []);
    return (
        <>
            Hey There i am game component Nice to meet you.
            <h1>Your Room id is : {roomId}</h1>
            <h1>{length}</h1>
            <h1 className="btn" >Click me</h1>

            {length<2 && <h1>Finding Other players</h1>}
            {length>=2 && <h1>All players are connected</h1>}
        </>
    )
}

export default Game;