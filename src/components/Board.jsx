import Square from "./Square";
import "./Board.css";
import { useState } from "react";

export default function Board({ squares, xIsNext, onPlay }) {
    const winnerInfo = calculateWinner(squares);
    const winner = winnerInfo?.winner;
    const winnerLines = winnerInfo?.winnerLines;
    const isDraw = !winner && squares.every((square) => square !== null);


    let status;
    if (winner) {
        status = "Winner : " + winner;
    } else if (isDraw) {
        status = "Game is Draw";
    }
    else {
        status = xIsNext ? 'Next Player : X' : 'Next Player : O';
    }

    const handleClick = (idx) => {
        if (squares[idx] || winnerInfo) {
            return;
        }

        const nextSquare = squares.slice();
        nextSquare[idx] = xIsNext ? 'X' : 'O';

        onPlay(nextSquare);
    }

    const renderBoard = () => {
        return [0, 1, 2].map(row => (
            <div className="board-row" key={row}>
                {[0, 1, 2].map(col => {
                    const index = row * 3 + col;
                    return (
                        <Square
                            key={index}
                            value={squares[index]}
                            handleClick={() => handleClick(index)}
                            isWinner={winnerLines?.includes(index)}
                        />
                    )
                })}
            </div>
        ))
    }

    return (
        <div>
            <div className="status">
                {status}
            </div>
            <div>
                {renderBoard()}
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return { winner: squares[a], winnerLines: [a, b, c] };
        }
    }
    return null;
}