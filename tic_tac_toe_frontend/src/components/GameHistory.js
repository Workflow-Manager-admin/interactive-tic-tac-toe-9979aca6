import React from "react";

// PUBLIC_INTERFACE
function GameHistory({ history, colors }) {
  /**
   * Shows playable history of last few completed games.
   */
  if (history.length === 0) return (
    <div style={{ margin: "10px auto", fontSize: 15, color: "#bbb" }}>
      No games played yet.
    </div>
  );

  return (
    <div
      style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: 420,
        background: "#f7fafc",
        borderRadius: 9,
        boxShadow: "0 1px 6px #eee",
        padding: "10px 18px",
        textAlign: "left"
      }}
    >
      <div style={{
        color: colors.primary,
        fontSize: 15,
        fontWeight: 700,
        marginBottom: 5
      }}>
        Game History
      </div>
      <ol style={{ paddingLeft: 22, margin: 0, marginBottom: 0, color: "#444" }}>
        {history.slice(-5).reverse().map((h, idx) => (
          <li key={`h${idx}`}>
            <span style={{ color: "#888", marginRight: 8 }}>
              {h.result === "Draw"
                ? "Draw"
                : `Winner: `}
            </span>
            {h.result !== "Draw" && (
              <strong style={{
                color: h.result === "X" ? colors.primary : colors.accent
              }}>
                {h.result}{" "}
              </strong>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default GameHistory;
