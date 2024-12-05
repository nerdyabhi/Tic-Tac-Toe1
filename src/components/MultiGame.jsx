import { useState } from "react"
import Lobby from "./Lobby";

const MultiGame = ()=>{
    const [isPlayOnline , setIsPlayOnline] = useState(false);

    if(!isPlayOnline) return <Lobby/>
    return (
        <>
        <h1>Hey There i am MultiGame</h1>
        </>
    )
}
export default MultiGame