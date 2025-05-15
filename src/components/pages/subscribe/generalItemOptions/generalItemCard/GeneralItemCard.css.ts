import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const subscribeItemCardContainer = recipe({
  base: {
    position: 'relative',
    width: "100%",
    backgroundColor: themeVars.colors.gray.gray0,
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px",
    padding: '16px',
    cursor: "pointer",
    boxShadow: themeVars.shadow.light,
    outline: 'none',
    gap: "4px",
  },
  variants: {
    isSelected: {
      true: 
      {
        outline: `1px solid ${themeVars.colors.red.red}`,
      },
      false: {
      }
    }
  },
  defaultVariants: {
    isSelected: false
  }
});


export const subscribeUpdateInputBox = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 10px 6px 14px",
  borderRadius: "8px",
  height: "38px",
  gap: "6px",
  backgroundColor: themeVars.colors.gray.gray100,
});