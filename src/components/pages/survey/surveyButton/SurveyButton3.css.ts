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
    fontSize: themeVars.fontSize["text-sm"],
    transition: 'border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease',
    cursor: 'pointer',
    backgroundColor: themeVars.colors.gray.gray0,
    position: 'relative',
  },
  variants: {
    checked: {
      true: {
        borderColor: themeVars.colors.red.red,
        color: themeVars.colors.red.red,
        backgroundColor: themeVars.backgroundColors.pinkFF,
      },
      false: {
        borderColor: themeVars.borderColors.greyDD,
        color: themeVars.colors.gray.gray900,
        backgroundColor: themeVars.colors.gray.gray0,
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
