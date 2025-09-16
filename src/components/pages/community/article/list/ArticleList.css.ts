import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const articleOverlay = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "auto",
  background: "linear-gradient(180deg, rgba(43, 43, 43, 0.00) 0%, rgba(43, 43, 43, 0.40) 40%, rgba(43, 43, 43, 0.80) 100%)",
  backgroundBlendMode: 'darken',
  color: themeVars.colors.gray.gray0,
  padding: "20px 12px",
  justifyContent: "flex-end",
  gap: '4px !important',
})