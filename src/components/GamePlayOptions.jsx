import GameMode from "./GameMode";

const GamePlayOptions = ({resetGame , aiMode , SetAIMode , gameMode , setGameMode})=>{
    return (
        <>
            {aiMode && !gameMode&& <GameMode setGameMode={setGameMode}/>}
             <button className='border px-3 py-2' onClick={()=>resetGame()}>Rest Game</button>
             <button className='border px-3 py-2' onClick={()=>{resetGame() , SetAIMode(!aiMode)}}>{aiMode?"With Friend":"VS AI"}</button>
        </>
    )
}

export default GamePlayOptions;