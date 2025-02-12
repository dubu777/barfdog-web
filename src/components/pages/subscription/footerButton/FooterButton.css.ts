import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";


export const footerButtonContainer = style({
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    margin: "0 auto",
    minWidth: "320px",
    maxWidth: "600px",
    padding: '20px',
    width: "100%",
    gap: '10px',
    zIndex: 20,
    backgroundColor: themeVars.colors.gray.gray0,
  });