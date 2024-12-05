import TicTacToe from "./components/TicTacToe";
 import Game from "./components/Game";
import Lobby1 from "./components/Lobby1";
import './index.css'
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import MultiGame from "./components/MultiGame";

const App = ()=>{
  return(
  <Router>
      <Routes>
        <Route path="/" element={<TicTacToe/>}/>
        <Route path="/lobby" element={<MultiGame/>}/>
        <Route path="/game/:roomId" element={<Game/>}/>
        <Route path="/lobby1" element={<Lobby1/>}/>
      </Routes>
  </Router>
  )
}

export default App;