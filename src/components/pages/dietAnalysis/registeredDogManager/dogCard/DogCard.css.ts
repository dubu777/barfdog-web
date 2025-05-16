import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const dogCardContainer = style({
  display: "flex",
  flexDirection: "column",
  padding: "12px",
  gap: "12px",
  backgroundColor: themeVars.colors.gray.gray0,
  borderRadius: "12px",
  boxShadow: themeVars.shadow.light,
  width: "100%",
  height: "148px",
})

export const profileImageStyle = style({
  borderRadius: "8px",
})
