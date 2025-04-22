import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const selectDeliveryOptionContainer = style({
  position: 'relative',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: '79px 0 123px 0',
  backgroundColor: themeVars.colors.gray.gray0,
});



export const selectOptionWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: '0 20px',
});
