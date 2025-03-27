import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const subscriptionNoticeContentBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  backgroundColor: themeVars.colors.gray.gray100,
  borderRadius: "8px",
  gap: "4px",
  padding: "16px 12px",
})