import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const myPageMenuContainer = style({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  background: themeVars.colors.gray.gray0,
})

export const category = style({
  padding: '20px 0 16px',
  borderBottom: `2px solid ${themeVars.colors.gray.gray900}`,
})

export const menuBox = style({
  display: 'flex',
  flexDirection: 'column'
})

export const menuItem = style({
  padding: '16px 0',
  borderBottom: `1px solid ${themeVars.colors.gray.gray200}`,
  selectors: {
    '&:last-child': {
      borderBottom: 0,
    }
  }
})

export const menuLink = style({
  width: '100%',
  height: '100%',
  textAlign: 'left',
})

export const logout = style({
  padding: '16px 20px 60px',
  background: themeVars.colors.gray.gray50,
  textAlign: 'left',
})

export const logoutButton = style({
  cursor: 'pointer',
  padding: '4px 0'
})