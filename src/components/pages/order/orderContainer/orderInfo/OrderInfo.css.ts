import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";


export const OrderInfoContainer = style({
  width: '100%',
})

export const OrderListBox = style({
  width: '100%',
  height: '50px',
  border: `1px solid ${themeVars.borderColors.grey79}`,
  borderRadius: '20px',
})