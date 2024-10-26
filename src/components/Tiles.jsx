const Tiles = ({ value, onclick, XTurn, Winner, disabled }) => {
    const btnColor = value === "X" ? "text-red-500" : value === "O" ? "text-green-500" : "";
    const placeHolderColor = XTurn ? "text-red-500" : "text-green-500";

    return (
        <button
            onClick={onclick}
            className="h-[80px] rounded-lg shadow-lg w-[80px] transition-all duration-200 text-center border-2 relative group"
        >
            <span className={`value ${btnColor} transition-all duration-200 text-4xl`}>
                {value}
            </span>

            {/* Corrected Conditional Rendering */}
            {(!value && !disabled && !Winner) && (
                <span
                    className={`absolute ${placeHolderColor} inset-0 flex items-center justify-center text-4xl text-black/50 opacity-0 group-hover:opacity-50 transition-all duration-200`}
                >
                    {XTurn ? "X" : "O"}
                </span>
            )}
        </button>
    );
};

export default Tiles;
