import React, { useEffect } from 'react';

const WinningGif = ({ Winner }) => {
    console.log(Winner);
    
    const gifSrc = Winner === "Game draw."
        ? "https://nerdyabhi.github.io/tic-tac-toe/asset/memeGameDraw.gif"
        : Winner === "X" ? "https://nerdyabhi.github.io/tic-tac-toe/asset/memeWin.webp" : "https://nerdyabhi.github.io/tic-tac-toe/asset/machineWins.webp";

    return (
        <img
            src={gifSrc}
            alt="Game Result"
            className="w-48 h-48 mb-6  rounded-lg "
        />
    );
};

const checkPrevgame = (Winner , setWinner , SetDisable)=>{
    if(!Winner) return;
    setWinner(null);

    SetDisable(true);
}


const WinScreen = ({ Winner, resetGame  , setWinner , SetDisable}) => {
    let [score1 , score2] = [0  , 0];

    const HandleKeyPress = (e)=>{
        if(e.key.toLowerCase() == "g"){
            checkPrevgame(Winner , setWinner , SetDisable);
            return;
        }

        if(e.key.toLowerCase() == "n"){
            if(!Winner) return;
            resetGame();
        }
    }

    if(Winner == "X") score1++;
    else if(Winner == "O") score2++;


    useEffect(()=>{
        window.addEventListener("keydown" , (e)=> HandleKeyPress(e));
        return ()=>window.removeEventListener("keydown" , HandleKeyPress);
    } , [Winner])

    return (
        <div className='flex flex-col  absolute h-[100vh] w-[100vw] bg-black z-20 bg-opacity-80 items-center justify-center'>
                <div className="container flex flex-col items-center justify-center gap-5">
                    {Winner!=="Game draw." &&<h1 className=' font-mono text-3xl font-bold '> <span className={Winner==="X"?"text-red-500":"text-green-500"}>{Winner}</span> Won the match 🎉🥳</h1>}
                    {Winner=="Game draw." &&<h1 className=' font-mono text-3xl font-bold '> It's a Draw ! </h1>}
                <WinningGif Winner={Winner}/>
                  </div>
                  <h1 className='2xl  font-bold font-mono'>Scores : </h1>
                    <div className="mb-2">
                        <h1 className='text-xl text-red-500 font-bold'>X - {score1}</h1>
                        <h1 className='text-xl text-green-500 font-bold'>O - {score2}</h1>
                    </div>
                    <div className="buttons space-y-3">
                    <button className='border px-3 w-[120px ] py-2 btn bg-opacity-0 hover:bg-opacity-0 rounded-xl w-[200px] max-w-[300px] border-slate-500  transition-all duration-200  shadow-md shadow-blue-800 flex justify-center items-center' onClick={()=>resetGame()}>New Game <kbd className="kbd kbd-sm">N</kbd></button>
                    <button className='border px-3 w-[120px ] py-2 btn bg-opacity-0 hover:bg-opacity-0 rounded-xl w-[200px] max-w-[300px] border-slate-500  transition-all duration-200  shadow-md shadow-blue-800 flex justify-center items-center' onClick={()=>checkPrevgame(Winner , setWinner , SetDisable)}>Check Previous Game <kbd className="kbd kbd-sm">G</kbd></button>
                    </div>

                {/* </div> */}
                
        </div>
    );
};

export default WinScreen;
