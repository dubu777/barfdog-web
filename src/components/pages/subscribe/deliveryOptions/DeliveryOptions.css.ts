import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const deliveryOptionsContainer = style({
  position: 'relative',
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  backgroundColor: themeVars.colors.gray.gray0,
});




export const selectOptionWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  padding: '28px 20px',
  gap: "16px",
});


export const mealFrequencyButtonWrapper = style({
  width: "276px",
})