import { useEffect, useState } from 'react'
import Board from './Board'
import { winningPatterns } from '../utils/constans';

const TicTacToe = ()=>{
    const [tiles , setTiles] = useState(Array(9).fill(null));
    const [XTurn , setXTurn] = useState(true);
    const [count , SetCount] = useState(1);


    useEffect(()=>{
        if(count>5) checkWinner();
    } , [tiles])

    const checkWinner = ()=>{
        console.log("Check Winner Called" , count);
        
        for(let pattern of winningPatterns){
           const [a , b , c ] = pattern;

           if(tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c])
            {
                    console.log(tiles[a] , "Won !");
                    return;
                    
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
      
    }


    return (
        <div className='flex flex-col gap-4 items-center justify-center h-[100vh]'>
            <h1>Tic Tac Toe</h1>
            <Board handleClick={handleClick} tiles= {tiles} XTurn = {XTurn}/>
            <button className='border px-3 py-2' onClick={()=>resetGame()}>Rest Game</button>
        </div>
    )
}

export default TicTacToe;