import { style } from "@vanilla-extract/css";

export const labelText = style({
  width: "100px",
  flexShrink: 0,
});

export const cardContainer = style({
  overflow: "hidden",
});

export const titleSection = style({
  padding: "16px 16px 12px 16px",
  borderBottom: "1px solid #f0f0f0",
});

export const detailTable = style({
  width: "100%",
  borderCollapse: "collapse",
  border: "none",
});

export const tableRow = style({
  borderBottom: "1px solid #f0f0f0",
  ":last-child": {
    borderBottom: "none",
  },
});

export const labelCell = style({
  padding: "12px 16px",
  backgroundColor: "#fafafa",
  width: "100px",
  verticalAlign: "top",
  fontWeight: 500,
});

export const valueCell = style({
  padding: "12px 16px",
  verticalAlign: "top",
  lineHeight: "1.5",
});
