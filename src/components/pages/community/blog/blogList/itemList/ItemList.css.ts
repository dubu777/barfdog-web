import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const categoryFilter = style({
  padding: '50px 0',
  display: 'flex',
  justifyContent: 'center',
  gap: '50px',
})

export const categoryButton = recipe({
  base: {
    cursor: 'pointer',
    color: themeVars.fontColors.grey97,
  },
  variants: {
    active: {
      true: {
        color: themeVars.colors.red.red,
        fontWeight: themeVars.fontWeight.bold,
      }
    }
  }
})

export const blogList = recipe({
  base: {
    borderTop: `1px solid ${themeVars.borderColors.greyED}`
  },
  variants: {
    isEmpty: {
      true: {
        padding: '50px 0 150px',
      }
    }
  }
})

export const blogItem = style({
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${themeVars.borderColors.greyED}`
})

export const blogImage = style({
  objectFit: 'cover',
})

export const blogInfo = style({
  width: '55%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',

})