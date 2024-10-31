import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";


export const buttonStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '200px',
    borderRadius: '9px',
    padding: '10px 20px',
    border: `1px solid ${themeVars.borderColors.greyDD}`,
    height: '45px',
    fontSize: themeVars.fontSize["text-md"],
    transition: 'border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease',
    cursor: 'pointer',
    backgroundColor: themeVars.colors.white,
  },
  variants: {
    checked: {
      true: {
        borderColor: themeVars.colors.mainRed,
        color: themeVars.colors.mainRed,
        backgroundColor: themeVars.backgroundColors.pinkFF,
      },
      false: {
        borderColor: themeVars.borderColors.greyDD,
        color: themeVars.colors.black,
        backgroundColor: themeVars.colors.white,
      },
    },
    type: {
      col: {
        minWidth: '200px',
      },
      row: {
        width: '100%',
      },
      grid: {

      },
    },
  },
  defaultVariants: {
    checked: false,
    type: 'col',
  },
});