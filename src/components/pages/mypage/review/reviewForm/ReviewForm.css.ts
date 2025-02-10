import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reviewFormContainer = style({ })

export const reviewTitle = style({
  marginBottom: '20px'
})

export const reviewRate = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  marginBottom: '1rem'
})

export const reviewForm = style({
  marginBottom: '30px',
  paddingBottom: '30px',
  borderBottom: `1px solid ${themeVars.borderColors.greyDD}`
})

export const submitContainer = style({
  width: '30%',
  margin: '0 auto',
})