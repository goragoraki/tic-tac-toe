import { useState } from "react";
import "./Square.css";

export default function Square({ value, handleClick, isWinner }) {

    return (
        <button
            className={`square ${isWinner ? 'winning' : ''}`}
            onClick={handleClick}
        >
            {value}
        </button>
    );
}