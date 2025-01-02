import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const couponModalContainer = style({
  position: 'relative',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "15px",
  padding: "10px",
});
