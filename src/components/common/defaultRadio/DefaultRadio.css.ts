import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const radioContainer = recipe({
  base: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    cursor: 'pointer',
  },
  variants: {
    labelPosition: {
      right: {
        // flexDirection: 'row-reverse'
      },
      bottom: {
        flexDirection: 'column-reverse',
        alignItems: 'center',
      }
    },
    justifyContent: {
      center: {
        justifyContent: 'center',
      },
      spaceBetween: {
        justifyContent: 'space-between',
      },
    }
  }
})

export const radioOption = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
})

export const radioInputCircle = recipe({
  base: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: `1px solid ${themeVars.borderColors.greyDD}`,
    cursor: 'pointer',
  },
  variants: {
    active: {
      true: {
        background: themeVars.colors.mainRed,
        border: `1px solid ${themeVars.colors.mainRed}`,
        position: 'relative',
        ':after': {
          content: '',
          display: 'block',
          width: '8px',
          height: '8px',
          background: themeVars.colors.white,
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

export const radioInput = style({
  display: 'none',
})

export const checkboxLabel = recipe({
  base: {
    lineHeight: 'normal',
    fontSize: themeVars.fontSize["text-sm"],
    cursor: 'pointer',
  },
  variants: {
    isHidden: {
      true: {
        display: 'none',
      }
    }
  }
})

export const checkboxStyle = recipe({
  base: {
    width: '20px',
    height: '20px',
    background: themeVars.colors.lightGrey,
    padding: 0,
    margin: 0,
    transition: 'all .35s',
    appearance: 'none',
    borderRadius: '3px',
    position: 'relative',
    cursor: 'pointer',
    ':after': {
      content: '',
      display: 'block',
      width: '20px',
      height: '20px',
      background: `url('/images/icons/check-white.png') no-repeat center center / 10px 10px`,
      position: 'absolute',
      top: 0
    }
  },
  variants: {
    isChecked: {
      true: {
        background: themeVars.colors.red,
      }
    },
  }
})