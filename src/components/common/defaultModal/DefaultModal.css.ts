import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const modalContainer = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: themeVars.backgroundColors.white,
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    overflowY: 'hidden',
  },
  variants: {
    size: {
      sm: {
        maxWidth: '300px',
      },
      md: {
        maxWidth: '350px',
      },
    },
    scroll: {
      true: {
        height: '450px',
      },
      false: {
      },
    },
  },
})

export const modalContentWrapper = recipe({
  base: {
    display: "flex",
    justifyContent: 'center',
    width: '100%',
    margin: '20px 0',
  },
  variants: {
    scroll: {
      true: {
        padding: "0 10px",
        overflowY: "auto",
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: themeVars.colors.white,
          border: `1px solid ${themeVars.borderColors.greyBB}`,
          borderRadius: '10px',
        },
      
        '::-webkit-scrollbar-track': {
          backgroundColor: themeVars.borderColors.greyDD,
          borderRadius: '10px',
        },
      },
      false: {
      },
    },
  },
  defaultVariants: {
    scroll: false,
  }
})

export const closeButtonWrapper = style({
  display: "flex",
  justifyContent: 'flex-end',
  width: '100%',
})
export const modalButtonWrapper = style({
  display: "flex",
  justifyContent: 'center',
  width: '100%',
  gap: '20px',
})