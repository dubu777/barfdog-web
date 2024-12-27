import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const postNavigationContainer = style({
  marginBottom: '60px',
})

export const moveToList = style({
  width: '30%',
  margin: '0 auto 40px',
})

export const postNavigation = style({
  borderTop: `1px solid ${themeVars.borderColors.black}`
})

export const navigationItem = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: `1px solid ${themeVars.borderColors.greyBB}`,
})

export const navTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  marginRight: '60px'
})

export const navLink = style({
  cursor: 'pointer',
})

export const prevArrow = style({
  transform: 'rotate(180deg)',
})
