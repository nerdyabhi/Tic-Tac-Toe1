
import Tiles  from "./Tiles"
const Board = ({tiles , handleClick , XTurn , Winner , disabled})=>{

    return (
        <div className="w-64 grid  grid-cols-[80px_80px_80px] gap-2 justify-center items-center ">

            {tiles.map((tile , index)=>{
                return  <Tiles key={index} XTurn={XTurn} Winner={Winner} disabled={disabled}  onclick={()=>handleClick(index)} value={tile}/>
            })}
        </div> 
    )
}
export default Board;