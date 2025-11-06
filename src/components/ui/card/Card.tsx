import { ReactNode } from "react";
import { commonWrapper } from "@/styles/common.css";

interface CardProps {
  direction?: "row" | "col";
  justify?: "start" | "center" | "end" | "between";
  align?: "start" | "center" | "end" | "between";
  width?: "full" | "auto";
  height?: "full";
  shadow?: "none" | "light" | "normal" | "strong";
  padding?: 8 |12 | 16 | 20 | 32 | "12/20" | "16/12" | "16/20" |"20/16";
  textAlign?: "left" | "center";
  children: ReactNode;
  className?: string;
  backgroundColor?: "gray0" | "gray50" | "gray100" | "transparent";
  borderRadius?: 0 | 8 | 12 | 16;
  gap?: 4 | 8 | 10 | 12 | 16 | 20 | 26 | 28 | 32 | 40;
  border?: "none" | "gray100" | "gray200" | "gray300" | "red";
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
  border = "none",
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
          border,
        })}
				${className || ""}
			`}
    >
      {children}
    </div>
  );
};

export default Card;
