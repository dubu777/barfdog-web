import { ReactNode } from "react";

import { commonWrapper } from "@/styles/common.css";

interface CardProps {
  direction?: "row" | "col";
  justify?: "start" | "center" | "end" | "between";
  align?: "start" | "center" | "end" | "between";
  width?: "full" | "auto";
  height?: "full";
  shadow?: "none" | "light" | "normal" | "strong";
  padding?: 12 | 16 | 20 | 32 | "12/20" | "16/20" |"20/16";
  textAlign?: "left" | "center";
  children: ReactNode;
  className?: string;
  backgroundColor?: "gray0" | "gray50" | "gray100" | "transparent";
  borderRadius?: 0 | 8 | 12 | 16;
  gap?: 4 | 8 | 12 | 16 | 20 | 26 | 32 | 40;
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
  children,
  backgroundColor = "gray0",
  borderRadius = 8,
  gap,
  className,
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
          textAlign,
          shadow,
          backgroundColors: backgroundColor,
          width,
          height,
          borderRadius,
        })}
				${className || ""}
			`}
    >
      {children}
    </div>
  );
};

export default Card;
