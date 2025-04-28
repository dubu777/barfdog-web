import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const recipeCardContainer = recipe({
  base: {
    position: 'relative',
    width: "100%",
    backgroundColor: themeVars.colors.gray.gray0,
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px",
    padding: '12px',
    cursor: "pointer",
    boxShadow: themeVars.shadow.light,
  },
  variants: {
    isSelected: {
      true: 
      {
        outline: `1px solid ${themeVars.colors.red.red}`,
      },
      false: {
        outline: '1px solid transparent',
      }
    }
  },
  defaultVariants: {
    isSelected: false
  }
});


export const recipeGramInputBox = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 16px",
  borderRadius: "8px",
  height: "38px",
  backgroundColor: themeVars.colors.gray.gray100,
});