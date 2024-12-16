import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const bannerContainer = recipe({
  base: {
    width: "100%",
    minWidth: "320px",
    maxWidth: "600px",
    height: '40px',
    margin: "0 auto",
    color: themeVars.colors.white,
    background: themeVars.colors.black,
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
    fontSize: themeVars.fontSize["text-sm"],
  },
  variants: {
    position: {
      top: {
        position: 'relative',
      },
      bottom: {
        bottom: '60px',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
      }
    }
  }
})

export const banner = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const closeBtn = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  right: '26px',
  cursor: 'pointer',
  '@media': {
    'screen and (max-width: 600px)': {
      right: '12px',
    }
  },
})

export const bottomBanner = style({
  fontSize: themeVars.fontSize["text-sm"],
  '@media': {
    'screen and (max-width: 600px)': {
      fontSize: themeVars.fontSize["text-xs"],
    }
  },
})

export const bannerTimestamp = style({
  display: 'inline-block',
  width: '6rem',
  textAlign: 'left',
  margin: '0 0 0 5px',
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 600px)': {
      width: '5rem',
    }
  },
})