import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const itemCardContainer = style({
  display: "flex",
  width: "100%",
  height: "76px",
  backgroundColor: themeVars.colors.gray.gray0,
  gap: "12px",
})