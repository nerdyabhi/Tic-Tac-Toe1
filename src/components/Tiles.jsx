const Tiles = ({value , onclick , XTurn})=>{
    return (
        <button
            onClick={onclick}
            className="h-[100px] w-[100px] transition-all duration-200 text-center border-2 relative group"
        >
            <span className="value transition-all duration-200 text-4xl">{value}</span>
            {!value && (
                <span className="absolute inset-0 flex items-center justify-center text-4xl text-black/50 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    {XTurn ? "X" : "O"}
                </span>
            )}
        </button>
    )
}

export default Tiles;