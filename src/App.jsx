import './App.css'
import Square from './components/Square'
import Board from './components/Board'
import { useState } from 'react';

function App() {
  const [squares, setSquares] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = squares[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const onPlay = (nextSquare) => {
    const nextSquares = [...squares.slice(0, currentMove + 1), nextSquare];
    setSquares(nextSquares);
    setCurrentMove(nextSquares.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  }

  const moves = squares.map((_, moves) => {
    const isCurrent = moves === currentMove;
    let description;

    if (isCurrent) {
      description = moves === 0
        ? 'You are at game start'
        : `You are at move #${moves}`
    } else {
      if (moves === 0) {
        description = 'Go to game start';
      } else {
        description = `Go to move #${moves}`
      }
    }
    return (
      <div key={moves}>
        {isCurrent ?
          <div>{description}</div> :
          <button onClick={() => jumpTo(moves)}>{description}</button>
        }
      </div>
    )
  })

  return (
    <div >
      <h1>Tic-Tac-Toe with react!!</h1>
      <div className='game-container'>
        <div className='game-board'>
          <Board squares={currentSquare} xIsNext={xIsNext} onPlay={onPlay} />
        </div>
        <div className='game-info'>
          {moves}
        </div>
      </div>
    </div>
  )
}

export default App
