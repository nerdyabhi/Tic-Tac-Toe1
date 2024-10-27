import { useEffect, useState } from 'react'
import Board from './Board'
import {winningPatterns} from '../utils/constans';
import {AImove, EasyMode , MediumMode} from '../utils/gameFunctions';
import GamePlayOptions from './GamePlayOptions';
import WinScreen from './WinScreen';

const TicTacToe = ()=>{
    const [tiles , setTiles] = useState(Array(9).fill(null));
    const [XTurn , setXTurn] = useState(true);
    const [count , SetCount] = useState(0);
    const [aiMode , SetAIMode]  = useState(false);
    const [gameMode , setGameMode] = useState(null);
    const [disabled , SetDisable] = useState(false);
    const [Winner , setWinner] = useState(null);

    useEffect(()=>{
        if(count>=5) checkWinner(tiles);
        
        // Check Modes for AI
        if(aiMode && !XTurn ){
            SetDisable(true);
            const index = gameMode=="easy"?EasyMode(tiles):gameMode=="medium"?MediumMode(tiles):AImove(tiles);
            setTimeout(() => {
                SetDisable(false);
                handleClick(index);
            }, 400);
            
        }


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
        setXTurn(true);
    }


    return (
        <div className='flex flex-col gap-4 items-center justify-center h-[100vh]'>

            <h1 className='text-3xl font-semibold '>Tic Tac Toe</h1>
            { gameMode && aiMode &&  <button className='btn' onClick={()=>setGameMode(null)}>{gameMode.toUpperCase()} <kbd className='kbd kbd-sm'>K</kbd></button>}
            <Board  Winner={Winner} handleClick={handleClick} tiles= {tiles} disabled={disabled} XTurn = {XTurn}/>
            <GamePlayOptions aiMode = {aiMode} SetAIMode={SetAIMode} resetGame={resetGame} gameMode={gameMode} setGameMode={setGameMode} />
            {Winner && <WinScreen Winner={Winner} resetGame={resetGame}/>}
        </div>
    )
}

export default TicTacToe;