import React from "react";

// PUBLIC_INTERFACE
function Square({ value, onClick, disabled, highlight, colors, pos }) {
  /**
   * Function square for game cell.
   * @param value: "X" | "O" | null
   * @param onClick: function
   * @param disabled: boolean
   * @param highlight: boolean
   * @param colors: color palette
   * @param pos: position
   */
  return (
    <button
      className="ttt-square"
      style={{
        width: 70,
        height: 70,
        fontSize: 38,
        background: highlight
          ? colors.accent
          : "#fff",
        color: value === "X" ? colors.primary : value === "O" ? colors.accent : "#aaa",
        border: `2.5px solid ${ highlight ? colors.primary : "#e9ecef" }`,
        borderRadius: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s",
        fontWeight: "700",
        boxShadow: highlight ? "0 0 8px 1px #ffc10755" : undefined,
        outline: "none"
      }}
      aria-label={`Square ${pos + 1}${value ? " " + value : ""}`}
      onClick={onClick}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {value}
    </button>
  );
}

export default Square;
