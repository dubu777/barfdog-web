import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const dietAnalysisPageContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "calc(100vh - 60px)",
  padding: "20px",
  backgroundColor: themeVars.colors.gray.gray50,
});