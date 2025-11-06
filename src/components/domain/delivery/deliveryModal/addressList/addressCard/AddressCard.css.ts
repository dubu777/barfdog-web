import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const addressCardContainer = recipe({
  base: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    padding: "20px 20px 16px 20px",
    borderRadius: "8px",
    gap: "12px",
    boxShadow: themeVars.shadow.light,
  },
  variants: {
    isSelectedAddress: {
      true: {
        border: `1px solid ${themeVars.colors.red.red}`,
      },
      false: {
        border: `1px solid ${themeVars.colors.gray.gray200}`,
      },
    },
  },
  defaultVariants: {
    isSelectedAddress: false,
  },
});

