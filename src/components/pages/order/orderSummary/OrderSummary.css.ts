import { style } from "@vanilla-extract/css";


export const orderSummaryContainer = style({
  display: "flex",
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
})

export const orderContentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

export const orderContentBox = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})