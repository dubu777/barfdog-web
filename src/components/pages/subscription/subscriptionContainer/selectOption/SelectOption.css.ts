import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const selectOptionContainer = style({
  position: 'relative',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: '79px 0 123px 0',
  backgroundColor: themeVars.colors.gray.gray0,
});

export const mealAmountTextWrapper = style({
  display: 'flex',
  flexDirection: "column",
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '0 20px'
})

export const mealAmountTextRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
})