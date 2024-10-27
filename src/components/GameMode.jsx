const GameMode = ({setGameMode})=>{
    return (
        <div className="absolute flex flex-col w-[100vw] h-[100vh] items-center justify-center gap-4 bg-slate-800">
            <button className="btn shadow-lg hover:scale-105 transition-all duration-200  shadow-blue-800 " onClick={()=>setGameMode("easy")}>Easy</button>
            <button className="btn shadow-lg hover:scale-105 transition-all duration-200 shadow-blue-800 " onClick={()=>setGameMode("Medium")}>Medium</button>
            <button className="btn shadow-lg hover:scale-105 transition-all duration-200 shadow-blue-800 " onClick={()=>setGameMode("hard")}>hard</button>
        </div>
    )
}
export default GameMode;