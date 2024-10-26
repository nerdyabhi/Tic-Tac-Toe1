
import Tiles  from "./Tiles"
const Board = ({tiles , handleClick , XTurn})=>{

    return (
        <div className="grid  grid-cols-[100px_100px_100px] justify-center items-center ">

            {tiles.map((tile , index)=>{
                return  <Tiles key={index} XTurn={XTurn} onclick={()=>handleClick(index)} value={tile}/>
            })}
        </div> 
    )
}
export default Board;