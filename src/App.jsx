import io from "socket.io-client";
import TicTacToe from "./components/TicTacToe";
import './index.css'
import { useState } from "react";
import Footer from "./components/Footer";


const socket = io.connect("http://localhost:5000");

const App = ()=>{

  return (
    <>
      <TicTacToe/>
    </>
  )
}

export default App;