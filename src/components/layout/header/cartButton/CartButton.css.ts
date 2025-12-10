import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const cartButton = style({
  position: "relative",
  cursor: "pointer",
});

export const cartCount = style({
  position: "absolute",
  width: "17px",
  height: "18px", 
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: themeVars.colors.gray.gray0,
  fontSize: themeVars.fontSize["text-xs"],
  top: -11,
  right: -5,
  background: `url('/images/icons/cartCircle.png') no-repeat center center / 17px 17px`,
});