import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const textFieldContainer = style({
  width: '100%',
})

export const textFieldLabel = recipe({
  base: {
    width: '100%',
  },
  variants: {
    isHidden: {
      true: {
        display: 'none',
      }
    }
  }
})

export const textFieldStyle = recipe({
  base: {
    width: '100%',
    height: '50px',
    borderRadius: '5px',
    padding: '0 20px',
    border: `1px solid ${themeVars.colors.lightGrey}`,
    color: themeVars.fontColors.grey38,
    transition: 'all .35s',
    outline: 'none',
    '::placeholder': {
      color: themeVars.colors.lightGrey,
    },
    '&:focus': {
      border: `1px solid ${themeVars.colors.red}`,
    },
  },
  variants: {
    size: {
      sm: {
        height: '40px',
      }
    },
    isActive: {
      true: {

      }
    },
    isDisabled: {
      true: {

      }
    },
    isHidden: {

    }
  }
})