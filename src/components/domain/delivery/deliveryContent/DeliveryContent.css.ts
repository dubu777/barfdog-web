import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const deliveryContentContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "12px",
  width: "100%",
});

export const requestBox = style({
  padding: "8px",
  width: "100%",
  backgroundColor: themeVars.colors.gray.gray50,
  border: `1px solid ${themeVars.colors.gray.gray200}`,
  borderRadius: "8px",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
});
