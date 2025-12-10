import React from "react";
import { divider } from "./Divider.css";
import { COLORS } from "@/constants/style";
import { TextColor } from "@/types/typography";

interface DividerProps {
  height?: 1 | 2 | 4 | 6 | 8 | 12 | 40 | 50 | 60 | 70;
  color?: TextColor;
  direction?: "horizontal" | "vertical";
  style?: React.CSSProperties;
}

export default function Divider({
  height = 8,
  color = "gray50",
  direction = "horizontal",
  style,
}: DividerProps) {
  const overrideColorStyle =
    direction === "horizontal"
      ? { borderBottomColor: COLORS[color] }
      : { borderLeftColor: COLORS[color] };

  const dividerStyle = { ...style, ...overrideColorStyle };

  return (
    <div
      className={divider({
        direction,
        height,
      })}
      style={dividerStyle}
    />
  );
}
