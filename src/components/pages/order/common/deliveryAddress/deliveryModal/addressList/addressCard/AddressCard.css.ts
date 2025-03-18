import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
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
    isDefaultAddress: {
      true: {
        border: `1px solid ${themeVars.colors.red.red}`,
      },
      false: {
        border: `1px solid ${themeVars.colors.gray.gray200}`,
      },
    },
  },
  defaultVariants: {
    isDefaultAddress: false,
  },
});


export const addressTitleWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: 'center',
  gap: '8px'
});

export const addressContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: 'center',
  gap: '2px'
});

export const buttonWrapper = style({
  display: "flex",
  justifyContent: 'space-between',
  alignItems: "center",
  alignSelf: 'stretch',
});

export const leftButtonContainer = style({
  minWidth: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

export const rightButtonWrapper = style({
  display: "flex",
  justifyContent: 'center',
  alignItems: "center",
  gap: "4px",
});






