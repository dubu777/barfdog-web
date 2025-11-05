import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const itemType = recipe({
  base: {
    padding: '20px 16px 10px',
    position: 'relative',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  variants: {
    active: {
      true: {
        selectors: {
          '&:after': {
            content: '',
            display: 'block',
            width: '20px',
            height: '2px',
            borderRadius: '10px',
            backgroundColor: themeVars.colors.red.red,
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }
        }
      }
    }
  }
})