import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const termsBottomSheetContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "20px 20px 105px 20px",
  width: "100%",
});

export const termsWrapper = style({
  overflowY: "auto",
  height: "300px",
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
