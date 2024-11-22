import { useEffect, useState } from 'react'
import Board from './Board'
import {winningPatterns} from '../utils/constants';
import {AImove, EasyMode , MediumMode} from '../utils/gameFunctions';
import GamePlayOptions from './GamePlayOptions';
import WinScreen from './WinScreen';
import Footer from './Footer';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
import useSocket from '../hooks/useSocket';
import WaitingScreen from './WaitingScreen';



const TicTacToe = ()=>{

    const [tiles , setTiles] = useState(Array(9).fill(null));
    const [XTurn , setXTurn] = useState(true);
    const [count , SetCount] = useState(0);
    const [aiMode , SetAIMode]  = useState(false);
    const [gameMode , setGameMode] = useState(null);
    const [disabled , SetDisable] = useState(false);
    const [Winner , setWinner] = useState(null);
    const [players, setPlayerName] = useState(["X" , "O"]);

    const [isPlayOnline, setIsPlayOnline] = useState(false);
    

    const checkWinner = ()=>{ 

        for(let pattern of winningPatterns){
           const [a , b , c ] = pattern;
    
           if(tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c])
            {
                    console.log(tiles[a] , "Won !");
                    // process.exitCode(0)
                    alert(tiles[a] + " won")
                    resetGame();

                    
            }
        }
    }

    const handleClick = (index)=>{
        const NewTiles = [...tiles ];
        if(NewTiles[index]) return; // if already clicked , then don't do it again 

        NewTiles[index] = XTurn?"X":"O";
        setTiles(NewTiles);
        SetCount(count+1);
        setXTurn(!XTurn);

    }
    
    const resetGame = ()=>{
        setTiles(Array(9).fill(null));
        SetCount(0);
        setWinner(null)
        SetDisable(false);
    }

    const {socket , setSocket,  opponent, opponentLeftTheGame, playingAs }  = useSocket(resetGame,tiles,  setTiles, setXTurn, SetCount, SetDisable, setWinner);

      
    const handleClick = (index) => {
        const newTiles = [...tiles];
        if (newTiles[index] || Winner || disabled) return;
        newTiles[index] = XTurn ? "X" : "O";
        setTiles(newTiles);
        SetCount(count + 1);
        setXTurn(!XTurn);
        if (isPlayOnline && opponent) {
          if (socket) {;
            socket.emit("user_made_move_client", { newTiles, nextTurn: !XTurn, count: count + 1 });
            SetDisable(true);
          }
        }
      };
    


    useEffect(()=>{
        /*** Code That handles VS AI  MODE */
        if(count>=5) checkWinner();
        if(aiMode && !XTurn ){
            SetDisable(true);
            const index = gameMode=="easy"?EasyMode(tiles):gameMode=="medium"?MediumMode(tiles):AImove(tiles);
            setTimeout(() => {
                SetDisable(false);
                handleClick(index);
            }, 370);
            
        }

        if(aiMode){
            setPlayerName([players[0], "Jarvis"]);
        }
    } , [tiles])



    /**** Play Online Handlers  *****/
    const playOnlineHanlder = ()=>{
        resetGame();
        setIsPlayOnline(true);
        const URL = import.meta.env.VITE_SOCKET_URL;
        console.log("Url for the same is : ", URL);
        
        const newSocket = io(URL, {
            autoConnect: true,
          });
      
          newSocket?.emit("request_to_play", {
            playerName: nanoid(4),
          });
      
          setSocket(newSocket);
    }

    /**** Code For WebSockets Ends Here ********/
    const styleColor = XTurn?"text-red-500":"text-green-500";


    if(!opponent && isPlayOnline){
        return <WaitingScreen/>
    }

    if(opponent && opponentLeftTheGame ){
        return <h1>Opponent Left the Game</h1>
    }

    return (
        <div className='flex flex-col gap-4 items-center justify-center h-[100vh]'>
            {/* Backgorund*/}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0),rgba(0,0,0,))] animate-pulse [animation-duration:4s]" />

            {/* Grid Overlay*/}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Actual Code */}
            <h1 className='text-3xl font-semibold '>Tic Tac Toe</h1>
            <h1 className={`${styleColor} md:text-xl text-lg font-bold`   }>{XTurn?`${players[0]}'s turn`:`${players[1]}'s turn`}</h1>

            {playingAs && <h1>Playing As : {playingAs}</h1>}
            {!isPlayOnline && !aiMode && <p className='text-white'>Playing with a friend</p>}
            {!isPlayOnline &&  gameMode && aiMode &&  <button className='btn z-10' onClick={()=>setGameMode(null)}>{gameMode.toUpperCase()} <kbd className=' z-10 kbd kbd-sm'>K</kbd></button>}

            {isPlayOnline && opponent && <h1>Opponent Found ! {opponent}  playing as </h1>}
            <Board  Winner={Winner} handleClick={handleClick} tiles= {tiles} disabled={disabled} XTurn = {XTurn}/>
            {!isPlayOnline && <GamePlayOptions aiMode = {aiMode} SetAIMode={SetAIMode} resetGame={resetGame} gameMode={gameMode} setGameMode={setGameMode} />}
            {Winner && <WinScreen Winner={Winner } setWinner={setWinner} resetGame={resetGame} SetDisable={SetDisable}/>}
            {!isPlayOnline && <button className="z-10 btn w-[225px]" onClick={playOnlineHanlder} >Play Online</button>}
            <Footer/>
             {/* Grid markers */}
             <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    
                <div className="absolute bottom-[10%] left-[10%] text-3xl text-yellow-500 animate-pulse [animation-delay:-1.5s] rotate-12">O</div>
                <div className="absolute top-[15%] right-[15%] text-2xl text-red-500 animate-pulse [animation-delay:-2s] -rotate-6">X</div>
                <div className="absolute bottom-[85%] right-[85%] text-3xl text-green-500 animate-pulse [animation-delay:-2.5s] rotate-45">O</div>
                <div className="absolute top-[40%] left-[10%] md:top-[50%] md:left-[80%] text-3xl md:text-6xl text-pink-500 animate-pulse [animation-delay:-3s] -rotate-12">X</div>
                <div className="absolute bottom-[40%] right-[10%]  md:top-[50%] md:right-[80%] text-3xl md:block  md:text-6xl text-green-500 animate-pulse [animation-delay:-3s] -rotate-12">O</div>
                <div className="absolute bottom-[75%] right-[0%] text-5xl text-orange-500 animate-pulse [animation-delay:-3.5s] rotate-180">O</div>
                <div className="absolute top-[90%] left-[50%] text-3xl text-teal-500 animate-pulse [animation-delay:-4s] rotate-90">X</div>
            </div>

        </div>
    )


}

export default TicTacToe;