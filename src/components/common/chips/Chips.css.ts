import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";


export const chipsVariants = { 
  solid: style({
    backgroundColor: themeVars.colors.red.red,
    color: themeVars.colors.gray.gray0,
    border: 'none',
    position: 'relative',
  }),
  outlined: style({
    border: `1px solid ${themeVars.colors.red.red}`,
    backgroundColor: themeVars.colors.gray.gray0,
    color: themeVars.colors.red.red,
    position: 'relative',
  })
}

export const chipVariantStyles = {
  solid: {
    red: style({ backgroundColor: themeVars.colors.red.red, }),
    gray800: style({ backgroundColor: themeVars.colors.gray.gray800 }),
    gray700: style({ backgroundColor: themeVars.colors.gray.gray700 }),
  },
  outlined: {
    red: style({
      border: `1px solid ${themeVars.colors.red.red}`,
      color: themeVars.colors.red.red,
      backgroundColor: themeVars.colors.gray.gray0,
    }),
    gray800: style({
      border: `1px solid ${themeVars.colors.gray.gray800}`,
      color: themeVars.colors.gray.gray800,
      backgroundColor: themeVars.colors.gray.gray0,
    }),
    gray700: style({
      border: `1px solid ${themeVars.colors.gray.gray700}`,
      color: themeVars.colors.gray.gray700,
      backgroundColor: themeVars.colors.gray.gray0,
    }),
  },
};


export const chipsSwitchOff = {
  solid: style({
    backgroundColor: themeVars.colors.gray.gray100,
    color: themeVars.colors.gray.gray700,
    border: 'none',
  }),
  outlined: style({
    backgroundColor: themeVars.colors.gray.gray0,
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
    display: "inline-flex",
    alignItems: "center",
    lineHeight: "normal",
    letterSpacing: '-0.4px',
    fontSize: '12px',
    fontWeight: 400,
    padding: '2px 8px',
    height: '24px',
    maxWidth: "fit-content",
    whiteSpace: 'nowrap'
  }),
  md: style({
    display: "inline-flex",
    alignItems: "center",
    lineHeight: "normal",
    letterSpacing: '-0.4px',
    fontSize: '14px',
    fontWeight: 500,
    padding: '4px 12px',
    height: '32px',
    maxWidth: "fit-content",
    whiteSpace: 'nowrap'
  }),
  lg: style({
    display: "inline-flex",
    alignItems: "center",
    lineHeight: "normal",
    letterSpacing: '-0.4px',
    fontSize: '16px',
    fontWeight: 700,
    padding: '4px 12px',
    height: '32px',
    maxWidth: "fit-content",
    whiteSpace: 'nowrap'
  })
}

export const chipsTailStyle = style({
  position: 'absolute',
  transform: 'translateX(-50%)',
  left: '50%',
  width: '12px',
  height: '12px',
  background: themeVars.colors.gray.gray800,
  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
})

export const chipsTailPosition = {
  top: style({
    top: '-6px',
  }),
  bottom: style({
    transform: 'translateX(-50%) rotate(180deg)',
    top: 'unset',
    bottom: '-6px',
  }),
}