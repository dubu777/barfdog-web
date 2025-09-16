import { themeVars } from "@/styles/theme.css";
import { style } from '@vanilla-extract/css';

export const footerContainer = style({
  background: themeVars.colors.gray.gray500,
  paddingBottom: '40px',
})

export const logo = style({
  padding: '20px 20px 12px',
})

export const menuLinkBox = style({
  padding: '0 8px',
})

export const menuLink = style({
  padding: '12px',
})

export const policyMenuLinkBox = style({
  padding: '8px',
})

export const policyMenuLink = style({
  padding: '4px 12px',
  selectors: {
    '&:first-child': {
      borderRight: `1px solid ${themeVars.colors.gray.gray50}`
    }
  }
})

export const footerInfo = style({
  padding: '0 20px',
})