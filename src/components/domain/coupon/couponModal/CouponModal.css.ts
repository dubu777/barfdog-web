import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const couponModalWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "calc(100vh - 52px)",
  overflowY: "auto",

  selectors: {
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: themeVars.colors.gray.gray100,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: themeVars.colors.gray.gray300,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: themeVars.colors.gray.gray400,
    },
  },
});
