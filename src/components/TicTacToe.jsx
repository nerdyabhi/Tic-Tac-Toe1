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

const TicTacToe = ()=>{
    const [tiles , setTiles] = useState(Array(9).fill(null));
    const [XTurn , setXTurn] = useState(true);
    const [count , SetCount] = useState(0);
    const [aiMode , SetAIMode]  = useState(false);
    const [gameMode , setGameMode] = useState(null);
    const [disabled , SetDisable] = useState(false);
    const [Winner , setWinner] = useState(null);
    const [players, setPlayerName] = useState(["Abhi" , "Aitrika"]);

    // /**** States for Online Play  *****/
    // const [socket , setSocket] = useState(null);
    const [isPlayOnline, setIsPlayOnline] = useState(false);
    // const [opponent , setOpponent] = useState(null);
    // const [opponentLeftTheGame , setOpponentLeftThegame] = useState(false);
    // const[playingAs , setPlayingAs] = useState(null);
    
    
  
    const handleClick = (index) => {
        const NewTiles = [...tiles];
        if (NewTiles[index] || Winner || disabled) return;
        NewTiles[index] = XTurn ? "X" : "O";
        setTiles(NewTiles); // Update the state with the new tiles
        SetCount(count + 1);
        const nextTurn = !XTurn;
        setXTurn(nextTurn);
    
        // Only emit to server after local update
        if (isPlayOnline && opponent) {
            SetDisable(true); // Disable clicking if a move is made
            console.log("Send this NewTiles to server", NewTiles);
            socket?.emit("user_made_move_client", { NewTiles, nextTurn, count: count + 1 });
        }
    };
    
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

        if(Winner && isPlayOnline && playingAs!=null && playingAs != Winner ){
            setWinner("You lose");
        }
    }
    
    const resetGame = ()=>{
        setTiles(Array(9).fill(null));
        SetCount(0);
        setWinner(null)
        SetDisable(false);
    }

    const onlineResetGame = ()=>{
        setWinner(null);
        setXTurn(true);
        if(isPlayOnline && playingAs === "X") SetDisable(false);
        else SetDisable(true);
        

    }

    const {socket , setSocket,   opponent, opponentLeftTheGame, playingAs , setPlayingAs, setOpponent }  = useSocket(resetGame, setTiles, setXTurn, SetCount, SetDisable, setWinner);


    useEffect(()=>{
        if(count>=5) checkWinner(tiles);
        
        /*** Code That handles VS AI  MODE */
        if(aiMode && !XTurn ){
            SetDisable(true);
            const index = gameMode=="easy"?EasyMode(tiles):gameMode=="medium"?MediumMode(tiles):AImove(tiles);
            setTimeout(() => {
                SetDisable(false);
                handleClick(index);
            }, 1000);
            
        }

        if(aiMode){
            setPlayerName([players[0], "Jarvis"]);
        }
    } , [tiles])



    /**** Play Online Handlers  *****/
    const playOnlineHanlder = ()=>{
        resetGame();
        setIsPlayOnline(true);
        const newSocket = io("http://localhost:5000", {
            autoConnect: true,
          });
      
          newSocket?.emit("request_to_play", {
            playerName: nanoid(4),
          });
      
          setSocket(newSocket);
    }

    useEffect(() => {
        if (socket) {
            socket.on("OpponentFound", (data) => {
                console.log("Succesfully Found the opponent", data);
                setOpponent(data.opponentName);
                setPlayingAs(data.playingAs);
                setXTurn(data.Xturn);
                if ((data.playingAs === "X" && !data.Xturn) || (data.playingAs === "O" && data.Xturn)) {
                    SetDisable(true);
                }
            });

            socket.on("OpponentLeftTheGame", () => {
                console.log("Opponent Left the Game");
                setOpponentLeftThegame(true);
            });


            socket?.on("user_made_move_server" , (data)=>{
                setXTurn(data.nextTurn);
                setTiles(data.NewTiles);
                console.log("Set count to " , data.count);
                SetCount(data.count);

                if ((playingAs === "X" && data.nextTurn === true) || (playingAs === "O" && data.nextTurn === false)) {
                    console.log("Setting disabled to false");
                    SetDisable(false);
                }
                 
            })


            socket.on("user_lost_the_match" , (playingAs)=>{
                setWinner(`{playingAs} Won the match..`);
            })

            return () => {
                socket.off("OpponentFound");
                socket.off("OpponentLeftTheGame");
                socket.off("user_made_move_server");
                socket.off("user_lose_the_match");
            };
        }


    }, [socket , playingAs , Winner ]);


    /**** Code For WebSockets Ends Here ********/
    const styleColor = XTurn?"text-red-500":"text-green-500";


    if(!opponent && isPlayOnline){
        return <h1 className='text-center'>Waiting for opponent</h1>
    }

    if(opponent && opponentLeftTheGame ){
        return <h1>Opponent Left the Game</h1>
    }

    return (
        <div className='flex flex-col gap-4 items-center justify-center h-[100vh]'>
            
            <h1 className='text-3xl font-semibold '>Tic Tac Toe</h1>
            <h1 className={`${styleColor} md:text-xl text-lg font-bold`   }>{XTurn?`${players[0]}'s turn`:`${players[1]}'s turn`}</h1>

            {playingAs && <h1>Playing As : {playingAs}</h1>}
            {!isPlayOnline && !aiMode && <p className='text-white'>Playing with a friend</p>}
            {!isPlayOnline &&  gameMode && aiMode &&  <button className='btn' onClick={()=>setGameMode(null)}>{gameMode.toUpperCase()} <kbd className='kbd kbd-sm'>K</kbd></button>}

            {isPlayOnline && opponent && <h1>Opponent Found ! {opponent}  playing as </h1>}
            <Board  Winner={Winner} handleClick={handleClick} tiles= {tiles} disabled={disabled} XTurn = {XTurn}/>
            {!isPlayOnline && <GamePlayOptions aiMode = {aiMode} SetAIMode={SetAIMode} resetGame={resetGame} gameMode={gameMode} setGameMode={setGameMode} />}
            {Winner && <WinScreen Winner={Winner} resetGame={resetGame}/>}
            {!isPlayOnline && <button className="btn w-[225px]" onClick={playOnlineHanlder} >Play Online</button>}
            <Footer/>
        </div>


    )


}

export default TicTacToe;