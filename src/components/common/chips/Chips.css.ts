import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const chipsVariants = {
  solid: style({
    backgroundColor: themeVars.colors.red.red,
    color: themeVars.colors.gray.gray0,
    border: 'none',
  }),
  outlined: style({
    border: `1px solid ${themeVars.colors.red.red}`,
    backgroundColor: 'transparent',
    color: themeVars.colors.red.red,
  })
}

export const chipsSwitchOff = {
  solid: style({
    backgroundColor: themeVars.colors.gray.gray100,
    color: themeVars.colors.gray.gray700,
    border: 'none',
  }),
  outlined: style({
    backgroundColor: 'transparent',
    color: themeVars.colors.gray.gray300,
    border: `1px solid ${themeVars.colors.gray.gray300}`,
  })
}

export const chipsBorderRadius = {
  small: style({
    borderRadius: '4px',
  }),
  full: style({
    borderRadius: '280px',
  })
}

export const chipsSize = {
  sm: style({
    display: 'inline-block',
    lineHeight: '148%',
    letterSpacing: '-0.4px',
    fontSize: '12px',
    fontWeight: 400,
    padding: '2px 8px',
  }),
  md: style({
    display: 'inline-block',
    lineHeight: '148%',
    letterSpacing: '-0.4px',
    fontSize: '14px',
    fontWeight: 500,
    padding: '4px 12px',
  }),
  lg: style({
    display: 'inline-block',
    lineHeight: '148%',
    letterSpacing: '-0.4px',
    fontSize: '16px',
    fontWeight: 700,
    padding: '4px 12px',
  })
}