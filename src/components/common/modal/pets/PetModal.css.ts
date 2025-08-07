import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const petModalContainer = style({
  maxWidth: "600px",
  width: "100%",
  height: "100vh",
  backgroundColor: themeVars.colors.gray.gray50,
});
