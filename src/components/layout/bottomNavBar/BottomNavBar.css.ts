import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const bottomNavBarContainer = style({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  width: "100%",
  minWidth: "320px",
  maxWidth: "600px",
  margin: "0 auto",
  height: "66px",
  padding: '40px 10px',
  zIndex: 10,
});

export const bottomNavBarWrapper = style({
  flex: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const navItemWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: 'center',
});

export const navText = recipe({
  base: {
    color: themeVars.fonColors.black,
    fontSize: themeVars.fontSize["text-xs"],
    marginTop: "5px",
  },
  variants: {
    active: {
      true: {
        color: themeVars.fonColors.darkRed,
      },
      false: {
        color: themeVars.fonColors.black,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
