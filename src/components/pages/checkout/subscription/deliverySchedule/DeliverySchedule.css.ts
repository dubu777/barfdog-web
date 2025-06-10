import { style } from "@vanilla-extract/css";

export const deliveryScheduleWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  gap: "6px",
});
export const deliveryScheduleContentWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
});
