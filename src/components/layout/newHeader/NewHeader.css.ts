import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";


export const headerContainer = style({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: 'stretch',
  height: "52px",
  padding: "0 20px",
  backgroundColor: themeVars.colors.gray.gray0,
});

export const centerSlot = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const leftSlot = style({
  display: "flex",
  alignItems: "center",
  gap: "28px",
});

export const rightSlot = style({
  display: "flex",
  alignItems: "center",
  gap: "28px",
});

