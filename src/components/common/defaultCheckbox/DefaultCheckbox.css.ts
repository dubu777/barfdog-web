import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const checkboxContainer = recipe({
  base: {
    display: 'flex',
    gap: '10px',
    cursor: 'pointer',
  },
  variants: {
    labelPosition: {
      right: {},
      bottom: {
        flexDirection: 'column-reverse',
        alignItems: 'center',
      }
    }
  }
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