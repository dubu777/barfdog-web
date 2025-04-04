import { style } from "@vanilla-extract/css"



export const mealAmountTextWrapper = style({
  display: 'flex',
  flexDirection: "column",
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
})

export const mealAmountTextRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
})