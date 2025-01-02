import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";


export const orderInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '15px',
  padding: '20px'
})

export const orderListBox = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '50px',
  border: `1px solid ${themeVars.borderColors.grey79}`,
  borderRadius: '20px',
})

export const orderItemListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  border: `1px solid ${themeVars.borderColors.grey79}`,
  borderRadius: '20px',
  gap: '10px',
})

export const orderItemWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
})

export const couponButton = style({
  backgroundColor: themeVars.backgroundColors.darkRed,
  color: themeVars.fontColors.white,
  padding: '2px 5px',
})

