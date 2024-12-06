import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const footerButtonContainer = recipe({
  base: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: '60px',
    margin: "0 auto",
    minWidth: "320px",
    maxWidth: "600px",
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    zIndex: 20,
    color: themeVars.fontColors.white,
    fontWeight: themeVars.fontWeight.semibold,
    fontSize: themeVars.fontSize["text-md"],

    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
  },
  variants: {
    isDisabled: {
      true: {
        backgroundColor: themeVars.backgroundColors.greyEE,
      },
      false: {
        backgroundColor: themeVars.backgroundColors.mainRed,
      }
    }
  },
  defaultVariants: {

  },

});