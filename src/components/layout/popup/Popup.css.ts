import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

const defaultOffset = 20;

export const popup = recipe({
  base: {
    width: '320px',
    position: 'fixed',
    zIndex: 999,
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: themeVars.shadow.light,
    border: `1px solid ${themeVars.colors.gray.gray300}`,
    display: 'flex',
    flexDirection: 'column',
  },
  variants: {
    position: {
      LEFT: {
        left: `${defaultOffset}px`,
      },
      MID: {
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
  width: '320px',
  height: '320px',
  aspectRatio: '1 / 1',
})

export const popupButton = style({
  width: '64px',
  cursor: 'pointer',
})

export const popupCheckbox = style({
  padding: '4px 6px'
})

export const popupAction = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 12px',
  background: themeVars.colors.gray.gray0,
})