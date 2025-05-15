import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const couponSelectorBox = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
  border: `1px solid ${themeVars.colors.gray.gray200}`,
  borderRadius: "8px",
  padding: "12px 16px",
  cursor: "pointer",
});
