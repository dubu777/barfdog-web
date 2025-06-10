import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const radioContainer = recipe({
  base: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    cursor: 'pointer',
  },
  variants: {
    justifyContent: {
      center: {
        justifyContent: 'center',
      },
      spaceBetween: {
        justifyContent: 'space-between',
      },
    },
    optionLabelPosition: {
      right: {},
      bottom: {
        flexDirection: 'column-reverse',
        alignItems: 'center',
      }
    },
  }
})

export const radioInput = style({
  display: 'none',
})

export const radioLabel = style({
  display: 'block',
  marginBottom: '8px',
})

export const radioOptions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
})

export const optionLabelCircle = recipe({
  base: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: `2px solid ${themeVars.colors.red.red}`,
    cursor: 'pointer',
  },
  variants: {
    active: {
      true: {
        background: themeVars.colors.gray.gray0,
        position: 'relative',
        ':after': {
          content: '',
          display: 'block',
          width: '9px',
          height: '9px',
          background: themeVars.colors.red.red,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
        }
      }
    }
  }
})

export const optionLabel = style({
  lineHeight: 'normal',
  fontSize: themeVars.fontSize["text-sm"],
  cursor: 'pointer',
})