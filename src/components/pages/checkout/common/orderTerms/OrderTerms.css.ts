import { style } from "@vanilla-extract/css";

export const orderTermWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "4px",
  width: "100%",
})

export const orderTermErrorWrapper = style({
  display: "flex",
  alignItems: "center",
  height: "20px",
  gap: "4px",
  marginLeft: "30px",
})