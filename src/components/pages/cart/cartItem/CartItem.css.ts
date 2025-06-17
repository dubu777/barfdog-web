import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const cartItem = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const cartItemInfoWrapper = style({
  display: "flex",
  gap: "8px",
});

export const cartItemInfo = style({
  width: "100%",
});

export const cartItemImage = style({
  borderRadius: "8px",
  border: "1px solid #eee",
});

export const cartItemInfoTop = style({
  display: "flex",
  gap: "8px",
  alignItems: "flex-start",
  justifyContent: "space-between",
});

export const cartItemContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const cartItemCounter = style({
  marginLeft: "auto",
});

export const itemInfo = style({
  display: "flex",
  gap: "6px",
  marginBottom: "10px",
});

export const itemInfoText = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "6px",
});

export const originalPrice = style({
  textDecoration: "line-through",
  color: themeVars.colors.gray.gray700,
  fontSize: themeVars.fontSize["text-sm"],
  marginLeft: "5px",
});

export const totalPriceBox = style({
  marginLeft: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

export const closeBtn = style({
  cursor: "pointer",
});
