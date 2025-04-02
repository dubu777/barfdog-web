import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const deliveryScheduleBottomSheetContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "20px"
})
export const deliveryScheduleInfoBoxWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "20px 20px 105px 20px",
  width: "100%",
})

export const deliveryScheduleImageWrapper = style({
  width: "100%",
  height: "130px",
  position: "relative",
  backgroundColor: themeVars.colors.gray.gray50,
})
export const deliveryScheduleTextWrapper = style({
  display: "flex",
  flexDirection: "column",
})