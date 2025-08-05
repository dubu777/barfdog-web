import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const dietAnalysisMainContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  gap: "20px",
  backgroundColor: themeVars.colors.gray.gray50,
  minHeight: "calc(100vh - 52px)",
});
