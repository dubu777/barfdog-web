import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const itemTypeFilter = style({
  width: '100%',
  backgroundColor: themeVars.colors.gray.gray0,
  display: 'flex',
  justifyContent: 'space-between',
})

export const itemType = recipe({
  base: {
    padding: '20px 16px 10px',
    position: 'relative',
    cursor: 'pointer',
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

export const sortByFilter = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  padding: '12px 20px 8px',
})