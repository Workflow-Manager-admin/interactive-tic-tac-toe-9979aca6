import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import ScorePanel from "./components/ScorePanel";
import GameHistory from "./components/GameHistory";
import { getBestMove } from "./utils/ai";

// Color palette from requirements
const COLORS = {
  primary: "#1976D2",
  accent: "#FFC107",
  background: "#FFFFFF"
};

// PUBLIC_INTERFACE
function Game() {
  /**
   * Core Tic Tac Toe game component managing state, gameplay, mode, and score tracking.
   * Implements real-time updates, 2-player and AI modes, restart/reset, and history.
   */

  // Game board state: Array of 9 ("X"|"O"|null)
  const [squares, setSquares] = useState(Array(9).fill(null));
  // "X" always goes first
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState("2-player"); // "2-player" or "ai"
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [history, setHistory] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [gameRunning, setGameRunning] = useState(true);

  // PUBLIC_INTERFACE
  function handleModeChange(e) {
    setMode(e.target.value);
    restartGame();
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
    setGameRunning(true);
  }

  // PUBLIC_INTERFACE
  function resetScoreAndGame() {
    setScore({ X: 0, O: 0 });
    setHistory([]);
    restartGame();
  }

  // PUBLIC_INTERFACE
  function handleSquareClick(i) {
    if (!gameRunning || squares[i]) return; // Ignore if already filled or game is over
    const nextSquares = squares.slice();
    const currentMark = xIsNext ? "X" : "O";
    nextSquares[i] = currentMark;

    setSquares(nextSquares);

    // Check for winner/draw
    const winnerResult = calculateWinner(nextSquares);
    if (winnerResult) {
      setWinner(winnerResult);
      setScore((prev) => ({
        ...prev,
        [winnerResult]: prev[winnerResult] + 1
      }));
      setHistory((h) => [...h, resultSummary(nextSquares, winnerResult)]);
      setGameRunning(false);
    } else if (nextSquares.every((sq) => sq)) {
      setIsDraw(true);
      setHistory((h) => [...h, resultSummary(nextSquares, "Draw")]);
      setGameRunning(false);
    } else {
      setXIsNext(!xIsNext);
    }
  }

  // AI Move effect
  useEffect(() => {
    if (
      mode === "ai" &&
      !winner &&
      !isDraw &&
      gameRunning &&
      !xIsNext // AI always plays "O"
    ) {
      // Delay to mimic thinking
      const aiTimeout = setTimeout(() => {
        const move = getBestMove(squares, "O");
        if (move !== null) handleSquareClick(move);
      }, 500);
      return () => clearTimeout(aiTimeout);
    }
    // eslint-disable-next-line
  }, [squares, xIsNext, winner, isDraw, gameRunning, mode]);

  // Utility
  function resultSummary(board, res) {
    // Returns an object for history
    return {
      moves: board.slice(),
      result: res
    };
  }

  // PUBLIC_INTERFACE
  function calculateWinner(squares) {
    /**
     * Calculates winner for current board state.
     * Returns "X", "O", or null.
     */
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
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: COLORS.background,
        justifyContent: "center",
        transition: "background 0.3s"
      }}
    >
      {/* Score panels */}
      <ScorePanel
        score={score}
        xIsNext={xIsNext}
        mode={mode}
        winner={winner}
        isDraw={isDraw}
        colors={COLORS}
      />

      {/* Mode select */}
      <div style={{ marginBottom: 16, marginTop: 8 }}>
        <label
          style={{
            fontWeight: 500,
            color: COLORS.primary,
            marginRight: 7,
            fontSize: 16
          }}
        >
          Game mode:
        </label>
        <select
          value={mode}
          onChange={handleModeChange}
          style={{
            padding: "6px 18px",
            borderRadius: 6,
            border: `1px solid ${COLORS.primary}`,
            fontSize: 16,
            background: "#fff",
            color: COLORS.primary,
            marginRight: 10
          }}
          aria-label="Game mode"
        >
          <option value="2-player">2 Player</option>
          <option value="ai">Play vs AI</option>
        </select>
        <button
          style={{
            marginLeft: 5,
            background: COLORS.accent,
            color: "#333",
            border: "none",
            borderRadius: 6,
            padding: "6px 18px",
            cursor: "pointer",
            fontWeight: 600
          }}
          onClick={resetScoreAndGame}
        >
          Reset All
        </button>
      </div>

      {/* Game Board */}
      <Board
        squares={squares}
        onSquareClick={handleSquareClick}
        gameOver={!!winner || isDraw}
        winner={winner}
        colors={COLORS}
      />

      {/* Game controls/history */}
      <div style={{ marginTop: 18, marginBottom: 16, width: "100%" }}>
        <button
          style={{
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "10px 26px",
            fontWeight: 700,
            fontSize: 17,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(30,30,60,0.03)",
            marginRight: 12
          }}
          onClick={restartGame}
        >
          {winner || isDraw ? "Play Again" : "Restart"}
        </button>
      </div>
      <GameHistory history={history} colors={COLORS} />
      <div style={{ padding: 16, fontSize: 13, color: "#888" }}>
        <span role="img" aria-label="react">
          ⚡️
        </span>{" "}
        Modern React Tic Tac Toe &mdash; minimal, light, fast
      </div>
    </div>
  );
}

export default Game;
