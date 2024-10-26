import { useEffect, useState } from 'react'
import Board from './Board'
import {winningPatterns} from '../utils/constans';
import AImove from '../utils/gameFunctions';

const TicTacToe = ()=>{
    const [tiles , setTiles] = useState(Array(9).fill(null));
    const [XTurn , setXTurn] = useState(true);
    const [count , SetCount] = useState(0);
    const [aiMode , SetAIMode]  = useState(true);
    const [disabled , SetDisable] = useState(false);
    const [Winner , setWinner] = useState(null);

    useEffect(()=>{
        if(count>=5) checkWinner(tiles);
        
        if(aiMode && !XTurn ){
            SetDisable(true);
            const index = AImove(tiles);
        
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
            {Winner && 
                <div className=" z-10 absolute flex flex-col items-center justify-center bg-gray-900 bg-opacity-95 h-[100vh] w-[100vw] ">
                    <h1 className='text-white'>{Winner} wins!</h1>
                    <button className='border px-3 py-2 text-white bg-black' onClick={()=>resetGame()}>New Game</button>
                </div>
            }
            <h1 className='text-3xl font-semibold '>Tic Tac Toe</h1>
            <Board  Winner={Winner} handleClick={handleClick} tiles= {tiles} disabled={disabled} XTurn = {XTurn}/>
            <button className='border px-3 py-2' onClick={()=>resetGame()}>Rest Game</button>
            <button className='border px-3 py-2' onClick={()=>{resetGame() , SetAIMode(!aiMode)}}>{aiMode?"With Friend":"VS AI"}</button>
        </div>
    )
}

export default TicTacToe;