import { useEffect, useState } from 'react'
import Board from './Board'
import {winningPatterns} from '../utils/constans';
import {AImove, EasyMode , MediumMode} from '../utils/gameFunctions';
import GamePlayOptions from './GamePlayOptions';
import WinScreen from './WinScreen';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';

const TicTacToe = ()=>{
    const [tiles , setTiles] = useState(Array(9).fill(null));
    const [XTurn , setXTurn] = useState(true);
    const [count , SetCount] = useState(0);
    const [aiMode , SetAIMode]  = useState(false);
    const [gameMode , setGameMode] = useState(null);
    const [disabled , SetDisable] = useState(false);
    const [Winner , setWinner] = useState(null);
    const [players, setPlayerName] = useState(["X" , "O"]);

    /**** States for Online Play  *****/
    const [socket , setSocket] = useState(null);
    const [isPlayOnline, setIsPlayOnline] = useState(false);
    const [opponent , setOpponent] = useState(null);
    

    const handleKeyDownMove = (e) => {
        const key= Number(e.key);
        if(key>=1 && key<=9){
            handleClick(key-1);
        }
    }
    
    useEffect(()=>{
        if(count>=5) checkWinner(tiles);
        
        /*** Code That handles VS AI  MODE */
        if(aiMode && !XTurn ){
            SetDisable(true);
            const index = gameMode=="easy"?EasyMode(tiles):gameMode=="medium"?MediumMode(tiles):AImove(tiles);
            setTimeout(() => {
                SetDisable(false);
                handleClick(index);
            }, 400);
            
        }

        if(aiMode){
            setPlayerName([players[0], "Jarvis"]);
        }

        /**** Code that Enables on KeyPress Mode ***/
        window.addEventListener("keydown", handleKeyDownMove);

        return () => {
            window.removeEventListener("keydown", handleKeyDownMove);
        };

    } , [tiles])

    const handleClick = (index)=>{
        const NewTiles = [...tiles ];
        if(NewTiles[index] || Winner || disabled) return; // if already clicked , then don't do it again 
        NewTiles[index] = XTurn?"X":"O";
        setTiles(NewTiles);
        SetCount(count+1);
        setXTurn(!XTurn);
    
    }

     const checkWinner = ()=>{ 

        for(let pattern of winningPatterns){
           const [a , b , c ] = pattern;
    
           if(tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c])
            {
                    console.log(tiles[a] , "Won !");
                    setWinner(tiles[a]);
                    return
            }
    
            if(count ===9){
                setWinner("Game draw.")
            }
        }
    }
    
    const resetGame = ()=>{
        setTiles(Array(9).fill(null));
        SetCount(0);
        setWinner(null)
        SetDisable(false);
        // setXTurn((prev)=>!prev);
    }



    /**** Play Online Handlers  *****/

    const playOnlineHanlder = ()=>{
        setIsPlayOnline(true);
        const newSocket = io("http://localhost:5000", {
            autoConnect: true,
          });
      
          newSocket?.emit("request_to_play", {
            playerName: nanoid(4),
          });
      
          setSocket(newSocket);
    }

    socket?.on("OpponentFound" , (data)=>{
        console.log("Succesfully Found the opponent" , data);
        setOpponent(data.opponentName);
    })


    /**** Code For WebSockets Ends Here ********/
    const styleColor = XTurn?"text-red-500":"text-green-500";


    if(!opponent && isPlayOnline){
        return <h1 className='text-center'>Waiting for opponent</h1>
    }

    return (

        <div className='flex flex-col gap-4 items-center justify-center h-[100vh]'>
            
            <h1 className='text-3xl font-semibold '>Tic Tac Toe</h1>
            <h1 className={`${styleColor} md:text-xl text-lg font-bold`   }>{XTurn?`${players[0]}'s turn`:`${players[1]}'s turn`}</h1>


            {!isPlayOnline && !aiMode && <p className='text-white'>Playing with a friend</p>}
            {!isPlayOnline &&  gameMode && aiMode &&  <button className='btn' onClick={()=>setGameMode(null)}>{gameMode.toUpperCase()} <kbd className='kbd kbd-sm'>K</kbd></button>}

            {isPlayOnline && opponent && <h1>Opponent Found ! {opponent}  playing as </h1>}
            <Board  Winner={Winner} handleClick={handleClick} tiles= {tiles} disabled={disabled} XTurn = {XTurn}/>
            <GamePlayOptions aiMode = {aiMode} SetAIMode={SetAIMode} resetGame={resetGame} gameMode={gameMode} setGameMode={setGameMode} />
            {Winner && <WinScreen Winner={Winner} resetGame={resetGame}/>}
            {!isPlayOnline && <button className="btn w-[225px]" onClick={playOnlineHanlder} >Play Online</button>}
            <Footer/>
        </div>


    )


}

export default TicTacToe;