import React from "react";
import {
  textStyles,
  fontColors,
  alignStyles,
  blockStyles,
  underline,
} from "./DefaultText.css";

interface DefaultTextProps {
  type: keyof typeof textStyles;
  color?: keyof typeof fontColors;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  inlineBlock?: boolean;
  block?: boolean;
  underLine?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const tagMap: Record<string, keyof JSX.IntrinsicElements> = {
  display1: "h1",
  display2: "h2",
  title1: "h3",
  title2: "h3",
  title3: "h3",
  title4: "h3",
  headline1: "span",
  headline2: "span",
  headline3: "span",
  headline4: "span",
  label1: "span",
  label2: "span",
  label3: "span",
  label4: "span",
  body1: "span",
  body2: "span",
  body3: "span",
  caption: "span",
};

export default function DefaultText({
  type,
  color = "gray900",
  align = "left",
  children,
  inlineBlock = false,
  block = false,
  underLine = false,
  className,
  style,
}: DefaultTextProps) {
  const textStyle = textStyles[type];
  const colorStyle = fontColors[color];
  const alignStyle = alignStyles[align];
  const underlineStyle = underLine ? underline : "";
  const Tag = tagMap[type] || "span";
  const blockStyle = blockStyles[inlineBlock ? "true" : "false"];
  // block prop이 true일 경우에만 display: block 스타일을 생성
  // const blockStyle = block ? blockStyles.true : "";

  return (
    <Tag
      className={`${textStyle} ${colorStyle} ${alignStyle} ${underlineStyle} ${blockStyle} ${
        className || ""
      }`}
      style={style}
    >
      {children}
    </Tag>
  );
}
