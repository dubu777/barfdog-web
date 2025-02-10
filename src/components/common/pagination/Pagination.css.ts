import {style} from "@vanilla-extract/css";
import {recipe} from "@vanilla-extract/recipes";
import {themeVars} from "@/styles/theme.css";

export const paginationContainer = style({
  display: 'flex',
  justifyContent: 'center',
  margin: '40px 0 20px'
})
export const numberButton = recipe({
  base: {
    width: '30px',
    height: '30px',
    color: themeVars.fontColors.grey97,
    cursor: 'pointer',
    selectors: {
      '&:disabled': {
        cursor: 'not-allowed',
      }
    }
  },
  variants: {
    active: {
      true: {
        border: `1px solid ${themeVars.colors.red}`,
        color: themeVars.colors.red,
      }
    },
    type: {
      prev: { marginRight: '50px' },
      next: { transform: 'rotate(180deg)', marginLeft: '50px' },
      last: { transform: 'rotate(180deg)' }
    }

  }
})