const GridMarkers = ()=>{
    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    
        <div className="absolute bottom-[10%] left-[10%] text-3xl text-yellow-500 animate-pulse [animation-delay:-1.5s] rotate-12">O</div>
        <div className="absolute top-[15%] right-[15%] text-2xl text-red-500 animate-pulse [animation-delay:-2s] -rotate-6">X</div>
        <div className="absolute bottom-[85%] right-[85%] text-3xl text-green-500 animate-pulse [animation-delay:-2.5s] rotate-45">O</div>
        <div className="absolute top-[40%] left-[10%] md:top-[50%] md:left-[80%] text-3xl md:text-6xl text-pink-500 animate-pulse [animation-delay:-3s] -rotate-12">X</div>
        <div className="absolute bottom-[40%] right-[10%]  md:top-[50%] md:right-[80%] text-3xl md:block  md:text-6xl text-green-500 animate-pulse [animation-delay:-3s] -rotate-12">O</div>
        <div className="absolute bottom-[75%] right-[0%] text-5xl text-orange-500 animate-pulse [animation-delay:-3.5s] rotate-180">O</div>
        <div className="absolute top-[90%] left-[50%] text-3xl text-teal-500 animate-pulse [animation-delay:-4s] rotate-90">X</div>
    </div>

    )
}

export default GridMarkers;