import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";


export const OrderInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '15px',
  padding: '20px'
})

export const OrderListBox = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '50px',
  border: `1px solid ${themeVars.borderColors.grey79}`,
  borderRadius: '20px',
})