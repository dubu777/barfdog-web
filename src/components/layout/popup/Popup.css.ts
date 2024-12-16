import {recipe} from "@vanilla-extract/recipes";
import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";

const defaultOffset = 20;

export const popup = recipe({
  base: {
    width: '400px',
    position: 'fixed',
    top: '50%',
    zIndex: 999,
    transform: 'translateY(-50%)',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 0 1.25rem rgba(0, 0, 0, 0.15)',
  },
  variants: {
    position: {
      LEFT: {
        left: `${defaultOffset}px`,
      },
      CENTER: {
        left: '50%',
        transform: 'translateX(-50%)',
      },
      RIGHT: {
        right: `${defaultOffset}px`,
      }
    }
  }
})

export const popupImage = style({
  display: 'block',
  height: '398px',
})

export const popupButton = style({
  width: '50%',
  height: '45px',
  background: themeVars.colors.white,
  fontSize: themeVars.fontSize["text-sm"],
  cursor: 'pointer',
  selectors: {
    '&:first-child': {
      borderRight: '1px solid #eee'
    }
  }
})
