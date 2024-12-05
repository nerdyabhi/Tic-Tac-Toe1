import { useEffect, useState , useRef } from 'react'
import Board from './Board'
import {winningPatterns} from '../utils/constants';
import {AImove, EasyMode , MediumMode} from '../utils/gameFunctions';
import GamePlayOptions from './GamePlayOptions';
import WinScreen from './WinScreen';
import Footer from './Footer';
import GridMarkers from './Ui/GridMarkers';
import GameMode from './GameMode';
import PlayersNamePanel from './PlayerNamePanel';
import { useNavigate } from 'react-router-dom';


const TicTacToe = ()=>{

    const [tiles , setTiles] = useState(Array(9).fill(null));
    const [XTurn , setXTurn] = useState(true);
    const [count , SetCount] = useState(0);
    const [aiMode , SetAIMode]  = useState(false);
    const [gameMode , setGameMode] = useState(null);
    const disabled = useRef(false);
    const [Winner , setWinner] = useState(null);
    const [players, setPlayerName] = useState(["X" , "O"]);
    const [playersNamePanel, setPlayersNamePanel] = useState(false);
    const Navigate = useNavigate();
        

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

    const keyHandler = (e)=>{
        
        const key = e.key;
        if(key >=1 && key<=9){
            handleClick(key-1);
        } 
        if(key.toLowerCase() == 'c'){
            setPlayersNamePanel(true);
        }

    }
    
    const resetGame = ()=>{
        setTiles(Array(9).fill(null));
        SetCount(0);
        setWinner(null)
        disabled.current = false;
        // if(aiMode) SetAIMode(false);
    }

      
    const handleClick = (index) => {
        const newTiles = [...tiles];
        if (newTiles[index] || Winner || disabled.current) return;
        newTiles[index] = XTurn ? "X" : "O";
        setTiles(newTiles);
        SetCount(count + 1);
        setXTurn(!XTurn);
      };
    


    useEffect(()=>{
        /*** Code That handles VS AI  MODE */
        if(count>=5) checkWinner();
        if(aiMode && !XTurn ){
            disabled.current = true;
            const index = gameMode=="easy"?EasyMode(tiles):gameMode=="medium"?MediumMode(tiles):AImove(tiles);
            setTimeout(() => {
                // SetDisable(false);
                disabled.current = false;
                handleClick(index);
            }, 370);
            
        }

      
    } , [tiles])

    useEffect(()=>{
        window.addEventListener("keydown" , keyHandler);
        return () => window.removeEventListener("keydown", keyHandler);
    } ,[tiles])



   

    /**** Code For WebSockets Ends Here ********/
    const styleColor = XTurn?"text-red-500":"text-green-500";

    return (
        <div className='flex flex-col gap-4 items-center justify-center h-[100vh]'>
            {/* Backgorund*/}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0),rgba(0,0,0,))] animate-pulse [animation-duration:4s]" />

            {/* Grid Overlay*/}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
            
        {/* Actual Code */}
            <h1 className='text-3xl font-semibold '>Tic Tac Toe</h1>
            <h1 onClick={(e)=>setPlayersNamePanel(true)} className={`${styleColor} md:text-xl cursor-pointer text-lg font-bold flex items-center z-10 justify-center gap-2`   }>{XTurn?`${players[0]}'s turn`:`${players[1]}'s turn`} <kbd className='kbd kbd-xs'>C</kbd></h1>

            {playersNamePanel && <PlayersNamePanel players={players} setPlayerName={setPlayerName} setPlayersNamePanel={setPlayersNamePanel}/>}
            {/* {playingAs && <h1>Playing As : {playingAs}</h1>} */}
            {!aiMode && <p className='text-white'>Playing with a friend</p>}
            { gameMode && aiMode &&  <button className='btn z-10' onClick={()=>setGameMode(null)}>{gameMode.toUpperCase()} <kbd className=' z-10 kbd kbd-sm'>K</kbd></button>}

            {/* { opponent && <h1>Opponent Found ! {opponent}  playing as </h1>} */}
            <Board  Winner={Winner} handleClick={handleClick} tiles= {tiles} disabled={disabled} XTurn = {XTurn}/>
            {<GamePlayOptions aiMode = {aiMode} SetAIMode={SetAIMode} resetGame={resetGame} gameMode={gameMode} setGameMode={setGameMode} />}
            {Winner && <WinScreen Winner={Winner } setWinner={setWinner} resetGame={resetGame} />}
            {<button className="z-10 btn w-[225px]" onClick = {()=> Navigate("/lobby")} >Play Online</button>}
            <Footer/>
             {/* Grid markers */}
             <GridMarkers/>

        </div>
    )


}

export default TicTacToe;