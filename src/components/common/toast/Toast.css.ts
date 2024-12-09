import {style} from "@vanilla-extract/css";
import {recipe} from "@vanilla-extract/recipes";
import {themeVars} from "@/styles/theme.css";

export const toastContainer = style({
  position: "fixed",
  top: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  zIndex: 1000,
})

export const toast = recipe({
  base: {
    padding: '12px 20px',
    backgroundColor: themeVars.colors.white,
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    textAlign: 'center',
    width: '300px',
    wordWrap: 'break-word',
    opacity: 1,
  },
  variants: {
    type: {
      success: {
        color: themeVars.fontColors.green,
        border: `1px solid ${themeVars.fontColors.green}`
      },
      error: {
        color: themeVars.colors.mainRed,
        border: `1px solid ${themeVars.colors.mainRed}`
      },
      warning: {
        color: 'orange',
        border: `1px solid orange`
      },
      info: {
        color: themeVars.colors.lightGrey,
        border: `1px solid ${themeVars.colors.lightGrey}`
      },
    }
  }
});