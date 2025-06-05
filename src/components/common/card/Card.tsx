import { ReactNode } from "react";
import {
  cardAlign,
  cardColorStyle,
  cardBorderRadius,
  cardPadding,
  cardShadow,
  cardGap,
  cardBaseStyle,
} from "@/components/common/card/Card.css";
import { Colors } from "@/constants/style";

interface CardProps {
  shadow: "light" | "normal" | "strong" | "none";
  padding?: 0 | 12 | 16 | 20 | "20/16";
  align?: "left" | "center";
  children: ReactNode;
  className?: string;
  width?: number;
  backgroundColor?: Colors;
  borderRadius?: "default" | "none";
  gap?: 0 | 4 | 8 | 12 | 16 | 20;
}

const Card = ({
  shadow = "normal",
  padding = 20,
  align = "left",
  className,
  children,
  width,
  backgroundColor = "gray0",
  borderRadius = "default",
  gap = 0,
}: CardProps) => {
  return (
    <div
      className={`
        ${cardBaseStyle}
				${cardColorStyle[backgroundColor]}
				${cardShadow[shadow]} 
				${cardPadding[padding]} 
				${cardAlign[align]}
				${cardBorderRadius[borderRadius]}
				${className || ""}
			`}
      style={{ width: width || "100%" }}
    >
      {children}
    </div>
  );
};

export default Card;
