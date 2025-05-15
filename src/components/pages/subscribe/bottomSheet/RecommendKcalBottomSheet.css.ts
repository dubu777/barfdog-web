import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const recommendKcalContainer = style({
  paddingBottom: "85px",
})

export const recommendKcalBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  maxWidth: "150px",
  width: "100%",
  border: `1px solid ${themeVars.colors.gray.gray600}`,
  borderRadius: "8px",
  backgroundColor: themeVars.colors.gray.gray0,
})