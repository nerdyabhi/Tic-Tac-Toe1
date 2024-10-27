const WinScreen = ({Winner , resetGame})=>{
    return (
        <>
              <div className=" z-10 absolute flex flex-col items-center justify-center bg-gray-900 bg-opacity-95 h-[100vh] w-[100vw] ">
                    <h1 className='text-white'>{Winner} wins!</h1>
                    <button className='border px-3 py-2 text-white bg-black' onClick={()=>resetGame()}>New Game</button>
                </div>
        </>
    )
}

export default WinScreen;