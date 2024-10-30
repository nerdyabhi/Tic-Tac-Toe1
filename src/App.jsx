import TicTacToe from "./components/TicTacToe";
import Lobby from "./components/Lobby"
import Game from "./components/Game";
import './index.css'
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";

const App = ()=>{
  return(
  <Router>
      <Routes>
        <Route path="/" element={<TicTacToe/>}/>
        <Route path="/lobby" element={<Lobby/>}/>
        <Route path="/game/:roomId" element={<Game/>}/>
      </Routes>
  </Router>
  )
}

export default App;