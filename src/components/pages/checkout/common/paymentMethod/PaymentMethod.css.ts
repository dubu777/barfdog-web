import { style } from "@vanilla-extract/css";

export const paymentMethodContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "20px",
  marginBottom: "20px",
});

export const paymentMethodWrapper = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  alignSelf: "stretch",
  gap: "8px",
});
