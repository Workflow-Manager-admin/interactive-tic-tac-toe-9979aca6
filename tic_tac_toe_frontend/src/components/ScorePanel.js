import React from "react";

// PUBLIC_INTERFACE
function ScorePanel({ score, xIsNext, winner, isDraw, mode, colors }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: "14px 0 5px 0",
        marginTop: 12,
        marginBottom: 4,
        fontSize: 18
      }}
    >
      <div
        style={{
          background: "#f4f7fa",
          borderRadius: 9,
          padding: "12px 28px",
          minWidth: 100,
          boxShadow: "0 1px 3px #ccc6"
        }}
      >
        <strong style={{ color: colors.primary }}>X</strong>
        <span style={{ margin: "0 8px" }}> {score.X} </span>
      </div>
      <div
        style={{
          background: "#f4f7fa",
          borderRadius: 9,
          padding: "12px 28px",
          minWidth: 100,
          boxShadow: "0 1px 3px #ccc6"
        }}
      >
        <strong style={{ color: colors.accent }}>O</strong>
        <span style={{ margin: "0 8px" }}> {score.O} </span>
      </div>
      <div style={{ fontWeight: 600, color: "#444", minWidth: 120 }}>
        {winner
          ? (
            <span>
              Winner:{" "}
              <span
                style={{
                  color:
                    winner === "X"
                      ? colors.primary
                      : colors.accent,
                  letterSpacing: 1.5
                }}
              >
                {winner}
              </span>
            </span>
          )
          : isDraw
            ? <span>Draw!</span>
            : (
              <span>
                {mode === "ai"
                  ? (xIsNext ? "Your turn (X)" : "AI's turn (O)")
                  : `Turn: ${xIsNext ? "X" : "O"}`}
              </span>
            )}
      </div>
    </div>
  )
}

export default ScorePanel;
