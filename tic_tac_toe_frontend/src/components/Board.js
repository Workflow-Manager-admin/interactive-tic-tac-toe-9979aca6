import React from "react";
import Square from "./Square";

// PUBLIC_INTERFACE
function Board({ squares, onSquareClick, gameOver, winner, colors }) {
  /**
   * Renders the Tic Tac Toe board. 
   * @param squares: Array of 9 elements ("X", "O", or null)
   * @param onSquareClick: Function(index)
   * @param gameOver: Boolean, disables board if true
   * @param winner: "X" or "O" if winner, null otherwise
   * @param colors: {primary, accent, background}
   */
  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        disabled={!!squares[i] || gameOver}
        highlight={winner && isWinningSquare(i, squares, winner)}
        colors={colors}
        key={`square-${i}`}
        pos={i}
      />
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 13,
        boxShadow: "0 2px 12px rgba(25,118,210,0.07)",
        display: "inline-block",
        padding: 18,
        margin: "20px 0 8px 0"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,70px)",
          gridTemplateRows: "repeat(3,70px)",
          gap: 6,
          justifyContent: "center"
        }}
      >
        {Array(9)
          .fill(0)
          .map((_, idx) => renderSquare(idx))}
      </div>
    </div>
  );
}

// Returns whether the cell is in the winning line
function isWinningSquare(i, squares, winner) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return lines.some(
    (line) =>
      line.includes(i) &&
      line.every((val) => squares[val] === winner)
  );
}

export default Board;
