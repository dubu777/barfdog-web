import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";


export const footerButtonContainer = recipe({
  base: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    margin: "0 auto",
    minWidth: "320px",
    maxWidth: "600px",
    width: "100%",
    gap: '10px',
    zIndex: 20,
    backgroundColor: themeVars.colors.gray.gray0,
  },
  variants: {
    divider: {
      true: {
        padding: '0 40px 20px 40px',
      },
      false: {
        padding: '20px 40px',
      }
    }
  },
  defaultVariants: {
    divider: false
  }
  });