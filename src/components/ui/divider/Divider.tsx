import React from "react";
import { divider } from "./Divider.css";
import { COLORS } from "@/constants/style";
import { TextColor } from "@/types/typography";

interface DividerProps {
  thickness?: 1 | 2 | 4 | 6 | 8 | 12;
  color?: TextColor;
  direction?: "horizontal" | "vertical";
  height?: 40 | 50 | 60 | 70;
  style?: React.CSSProperties;
}

export default function Divider({
  thickness = 8,
  color = "gray50",
  direction = "horizontal",
  height = 40,
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
        thickness,
        height: direction === "vertical" ? height : undefined,
      })}
      style={dividerStyle}
    />
  );
}
