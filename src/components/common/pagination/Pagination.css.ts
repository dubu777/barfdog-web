import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const paginationContainer = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0 20px',
    background: themeVars.colors.gray.gray0,
  },
  variants: {
    isMobileDevice: {
      true: {
        gap: '16px'
      }
    }
  }
})

export const numberButton = recipe({
  base: {
    width: '44px',
    height: '44px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: themeVars.colors.gray.gray800,
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
        borderRadius: '50%',
        background: themeVars.colors.gray.gray900,
      }
    },
    type: {
      next: { transform: 'rotate(180deg)',},
    }
  }
})