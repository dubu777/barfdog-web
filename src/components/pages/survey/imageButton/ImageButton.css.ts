import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";


export const imageButtonBox = recipe({
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    padding: "20px",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
  },
  variants: {
    isChecked: {
      true: {
        backgroundColor: themeVars.colors.red.pinkWhite,
        border: `1px solid ${themeVars.colors.red.red}`,
      },
      false: {
        backgroundColor: themeVars.colors.gray.gray0,
        border: `1px solid ${themeVars.colors.gray.gray200}`,
        boxShadow: themeVars.shadow.light,
      },
    },
  },
  defaultVariants: {
    isChecked: false,
  },
})

export const rankChip = style({
  position: "absolute",
  top: "-1px",
  left: "-1px",
  padding: "2px 8px",
  backgroundColor: themeVars.colors.red.red,
  borderBottomRightRadius: "4px",
  borderTopLeftRadius: "8px",
});

export const checkBoxWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "4px",
  left: "4px",
});