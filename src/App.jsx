import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

 const PLAYERS = {
   X: 'Player 1',
    O: 'Player 2',
 };
 const initialGmaeBoard = [
    [null,null,null],
     [null,null,null],
      [null,null,null],

];
function derivewinner(players,gameBoard){
   
  
  let winner;
   for(const combination of WINNING_COMBINATIONS){
    const firstsqauresymbol = gameBoard[combination[0].row][combination[0].col];
     const   secondsqauresymbol = gameBoard[combination[1].row][combination[1].col];
      const thirdsqauresymbol =gameBoard[combination[2].row][combination[2].col];
     if(firstsqauresymbol && firstsqauresymbol === secondsqauresymbol && firstsqauresymbol === thirdsqauresymbol){
         winner = players[firstsqauresymbol];
     }
   }
   return winner;
}

function derivegameBoard(gameTurns){
   let gameBoard = [...initialGmaeBoard.map((array)=>[...array])];
      for(const turn of gameTurns){
          const {square,player} = turn;
          const {row,col} = square;
          gameBoard[row][col] = player;
      }
      return gameBoard;

}

  function derivedactiveplayer(gameTurns){
      let currPlayer = 'X';
      if( gameTurns.length > 0 && gameTurns[0].player ==='X'){
        currPlayer = 'O';
      }
      return currPlayer;
  }
function App() {
   const [players,setPlayers] = useState(PLAYERS);
   const [gameTurns,setGameTurns] = useState([]);
    const activePlayer = derivedactiveplayer(gameTurns);
   const gameBoard = derivegameBoard(gameTurns);
   const winner = derivewinner(players,gameBoard);
const draw = gameTurns.length === 9 && !winner;
  function handlePlayer({rowIndex,colIndex}){
    
    setGameTurns(prevTurns=>{
       const currPlayer = derivedactiveplayer(prevTurns);
      const updatedTurns = [{ square : {row : rowIndex,col:colIndex},player:currPlayer},
        ...prevTurns];
         return updatedTurns;
    });
  }
  

  function handleRestart(){
    setGameTurns([]);
  }
 

  function handlerPlayerName({symbol,newName}){
    setPlayers((prevPlayers)=>{
    return {  ...prevPlayers,
      [symbol] : newName
    };
    });
  }

  return (
  <menu>
    <div id="game-container" >
    <ol id="players" className="highlight-player">
     <Player initialValue={PLAYERS.X} symbol = "X" isActive={activePlayer==='X'} onChange={handlerPlayerName}/>
     <Player initialValue={PLAYERS.O}symbol = "O"   isActive={activePlayer==='O'} onChange={handlerPlayerName}/>
    </ol>
    {(winner||draw) && <GameOver winner={winner} onRestart={handleRestart}></GameOver>}
     <GameBoard onSelectSquare = {handlePlayer} board={gameBoard} />
    </div>
   <Log turns={gameTurns}/>
  </menu>
  )
}

export default App
