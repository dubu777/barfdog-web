import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const orderItemCardContainer = style({
  display: "flex",
  gap: "8px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

export const orderItemCardImage = style({
  width: "88px",
  height: "88px",
  borderRadius: "8px",
});

export const orderItemContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "8px",
  width: "100%",
});

export const orderItemInfoWrapper = style({
  display: "flex",
  flexDirection: "column",
});

export const orderOptionWrapper = style({
  display: "flex",
  gap: "8px",
  padding: "12px",
  width: "100%",
  borderRadius: "8px",
  backgroundColor: themeVars.colors.gray.gray100,
});
