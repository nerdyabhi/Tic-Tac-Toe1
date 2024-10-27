import { useEffect } from "react";
import GameMode from "./GameMode";

const GamePlayOptions = ({resetGame , aiMode , SetAIMode , gameMode , setGameMode})=>{


    const handleKeyPress = (evt)=>{
        const key = evt.key.toLowerCase();
        if(key ==='r'){
            resetGame();
        }

        else if(key ==='a'){
            resetGame();
            SetAIMode(!aiMode);
        }

        else if(key ==='k'){
           setGameMode(null);
        }
    }
    useEffect(()=>{
        window.addEventListener("keydown" , handleKeyPress);

        return(()=>{
            window.removeEventListener("keydown" , handleKeyPress);
        })
    })


    return (
        <>
            {aiMode && !gameMode&&  <GameMode setGameMode={setGameMode}/>}

            <div className="flex gap-5">

             <button className='border px-3 py-2 btn  shadow-md shadow-blue-800 flex justify-center items-center' onClick={()=>resetGame()}>Reset Game <kbd className="kbd kbd-sm">R</kbd></button>
             <button className='border px-3 py-2 btn  shadow-md shadow-blue-800 flex justify-center items-center' onClick={()=>{resetGame() , SetAIMode(!aiMode) }}>{aiMode?"With Friend":"VS AI"} <kbd className="kbd kbd-sm">A</kbd></button>
            </div>
        </>
    )
}

export default GamePlayOptions;