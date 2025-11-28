import { ReactNode } from "react";
import { commonWrapper } from "@/styles/common.css";
import { cardRecipe } from "./Card.css";

interface CardProps {
  direction?: "row" | "col";
  justify?: "start" | "center" | "end" | "between";
  align?: "start" | "center" | "end" | "between";
  width?: "full" | "auto";
  height?: "full";
  shadow?: "none" | "light" | "normal" | "strong";
  padding?: 8 | 12 | 16 | 20 | 32 | "20/16";
  textAlign?: "left" | "center";
  children: ReactNode;
  className?: string;
  backgroundColor?: "gray0" | "gray50" | "gray100" | "transparent";
  borderRadius?: 0 | 8 | 12 | 16;
  gap?: 4 | 8 | 10 | 12 | 16 | 20 | 26 | 28 | 32 | 40;
  border?: "none" | "gray100" | "gray200" | "gray300" | "red" | "blue500";
  paddingX?: 8 | 12 | 16 | 20 | 32 | 40;
  paddingY?: 4 | 8 | 12 | 16 | 20 | 32 | 40;
  paddingBottom?: 8 | 12 | 16 | 20 | 32 | 40;
  paddingTop?: 8 | 12 | 16 | 20 | 32 | 40;
  hoverShadow?: boolean;
  hoverScale?: boolean;
  onClick?: () => void;
}

const Card = ({
  direction = "col",
  justify,
  align,
  width,
  height,
  textAlign,
  shadow = "light",
  padding,
  paddingX,
  paddingY,
  paddingBottom,
  paddingTop,
  children,
  backgroundColor = "gray0",
  borderRadius = 8,
  gap,
  className,
  border = "none",
  hoverShadow = false,
  hoverScale = false,
  onClick,
}: CardProps) => {
  return (
    <div
      className={`
        ${commonWrapper({
          direction,
          justify,
          align,
          gap,
          padding,
          paddingX,
          paddingY,
          paddingBottom,
          paddingTop,
          textAlign,
          shadow,
          backgroundColors: backgroundColor,
          width,
          height,
          borderRadius,
          border,
        })}
				${cardRecipe({ hoverShadow, hoverScale })}
				${className || ""}
			`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
