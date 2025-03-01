const Tiles = ({ value, onclick, XTurn, Winner, disabled , index }) => {
    const btnColor = value === "X" ? "text-red-500" : value === "O" ? "text-green-500" : "";
    const placeHolderColor = XTurn ? "text-red-500" : "text-green-500";

    return (
        <button
            onClick={onclick}
            className=" relative h-[70px] w-[70px] rounded-lg shadow-md shadow-blue-800   transition-all duration-200 text-center bg-zinc-900 relative group"
        >
            <span className={`value ${btnColor} transition-all duration-200 text-4xl`}>
                {value}
            </span>

            {/* Conditional Rendering */}
            {(!value && !disabled.current && !Winner) && (
                <span
                    className={`absolute ${placeHolderColor} inset-0 flex items-center justify-center text-4xl text-black/50 opacity-0 group-hover:opacity-50 transition-all duration-200`}
                >
                    {XTurn ? "X" : "O"}
                </span>
            )}

            {/* Keyboard Button Below */}
            <kbd className=" absolute right-0 bottom-0 kbd kbd-xs">{index+1}</kbd>
        </button>
    );
};

export default Tiles;
