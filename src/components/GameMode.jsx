import { useEffect } from "react";

const GameMode = ({setGameMode})=>{

    const handleSetGameMode = (mode)=>{
        setGameMode(mode);
    }
    
    const handleKeyDown = (evt)=>{
        const key = evt.key.toLowerCase();
        if(key === 'e') handleSetGameMode("easy");
        if(key === 'm') handleSetGameMode("medium");
        if(key === 'h') handleSetGameMode("hard");
        
    }

        
    useEffect(()=>{
        window.addEventListener("keydown" , handleKeyDown)
        return (()=>{
            window.removeEventListener("keydown" , handleKeyDown);
        })
    }, [])

    
    return (
        <div className="absolute flex flex-col w-[100vw] h-[100vh] items-center justify-center gap-4 bg-slate-800">
            <button className="btn shadow-lg hover:scale-105 transition-all duration-200  shadow-blue-800 flex items-center justify-center "  onClick={()=>handleSetGameMode("easy")}>Easy <kbd className="kbd kbd-sm">E</kbd></button>
            <button className="btn shadow-lg hover:scale-105 transition-all duration-200  shadow-blue-800 flex items-center justify-center "  onClick={()=>handleSetGameMode("medium")}>Medium <kbd className="kbd kbd-sm">M</kbd></button>
            <button className="btn shadow-lg hover:scale-105 transition-all duration-200  shadow-blue-800 flex items-center justify-center "  onClick={()=>handleSetGameMode("hard")}>Hard <kbd className="kbd kbd-sm">H</kbd></button>
        </div>
    )
}
export default GameMode;