
import Tiles  from "./Tiles"
const Board = ({tiles , handleClick , XTurn , Winner , disabled})=>{

    return (
        <div className="w-64 grid  grid-cols-[80px_80px_80px] gap-2 gap-y-4 justify-center items-center m-4 ">

            {tiles.map((tile , index)=>{
                return  <Tiles key={index} XTurn={XTurn} Winner={Winner} disabled={disabled}  onclick={()=>handleClick(index)} value={tile}/>
            })}
        </div> 
    )
}
export default Board;