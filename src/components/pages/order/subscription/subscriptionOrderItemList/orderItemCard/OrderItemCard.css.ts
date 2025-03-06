import { style } from "@vanilla-extract/css";

export const OrderItemCardContainer = style({
  display: "flex",
  gap: "8px",
  justifyContent: "center",
  alignItems: "center",
});

export const OrderItemCardImageWrapper = style({
  width: "88px",
  height: "88px",
  borderRadius: "8px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const OrderItemContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "8px",
  width: "100%",
});

export const OrderItemInfoWrapper = style({
  display: "flex",
  flexDirection: "column",
});
