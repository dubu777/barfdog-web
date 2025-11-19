import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const itemType = recipe({
  base: {
    padding: "20px 16px 10px",
    position: "relative",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontWeight: themeVars.typography.label.label1.fontWeight,
    fontSize: themeVars.typography.label.label1.fontSize,
    lineHeight: themeVars.typography.label.label1.lineHeight,
    letterSpacing: themeVars.typography.label.label1.letterSpacing,
    transition: "color 0.2s ease",
    selectors: {
      "&:after": {
        transition: "background-color 0.2s ease",
      },
    },
  },
  variants: {
    active: {
      true: {
        color: themeVars.colors.red.red,
        selectors: {
          "&:after": {
            content: "",
            display: "block",
            width: "20px",
            height: "2px",
            borderRadius: "10px",
            backgroundColor: themeVars.colors.red.red,
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            color: themeVars.colors.red.red,
          },
        },
      },
      false: {
        color: themeVars.colors.gray.gray300,
        selectors: {
          "&:hover": {
            color: themeVars.colors.gray.gray400,
          },
          "&:hover:after": {
            content: "",
            display: "block",
            width: "20px",
            height: "2px",
            borderRadius: "10px",
            backgroundColor: themeVars.colors.gray.gray400,
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
          },
        },
      },
    },
  },
});
