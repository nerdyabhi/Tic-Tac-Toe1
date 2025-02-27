import React, {  useState } from 'react'

const PlayersNamePanel = ({ players, setPlayerName , setPlayersNamePanel }) => {

    const [player1 , setPlayer1] = useState(players[0]);
    const [player2 , setPlayer2] = useState(players[1]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlayerName([player1 || 'X', player2 || 'O']);
        setPlayersNamePanel(false);
    }

    return (
        <div className="fixed inset-0 bg-slate-800 h-[100vh] w-[100vw] bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-gray-900 p-6 py-8  rounded-xl border border-slate-500  shadow-lg w-80">
                <h2 className="text-xl font-bold text-white mb-4">Enter Player Names</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Player 1 (X)"
                        onChange={(e)=>setPlayer1(e.target.value)}
                        value={player1}
                        className="input input-bordered bg-gray-800 text-white"
                        maxLength={12}
                    />
                    <input
                        type="text"
                        placeholder="Player 2 (O)"
                        onChange={(e)=>setPlayer2(e.target.value)}
                        value={player2}
                        className="input input-bordered bg-gray-800 text-white"
                        maxLength={12}
                    />
                    <div className="flex gap-2">
                        <button type="submit" 
                        className='border px-3 w-[200px] py-2 btn bg-opacity-0 hover:bg-opacity-0 rounded-xl border-slate-500  transition-all duration-200  shadow-md shadow-blue-800 flex justify-center items-center'>

                            Change Name
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setPlayersNamePanel(false)} 
                            className='border px-3 w-[120px ] py-2 btn bg-opacity-0 hover:bg-opacity-0 rounded-xl border-slate-700  transition-all duration-200  shadow-md shadow-blue-800 flex justify-center items-center'>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PlayersNamePanel;