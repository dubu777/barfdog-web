import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const recipeSelectContainer = style({
  position: 'relative',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  paddingBottom: '105px',
  backgroundColor: themeVars.colors.gray.gray50,
});

export const recipeSelectTitleWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  gap: "20px",
  padding: "0 20px 10px 20px",
  backgroundColor: themeVars.colors.gray.gray0,
});

export const recipeTabBarWrapper = style({
  position: "sticky",
  top: "52px",
  zIndex: 1,
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  padding: "10px 20px 20px 20px",
  backgroundColor: themeVars.colors.gray.gray0,
});


export const recipeSelectWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

export const recipeSelectBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "32px 20px",
  scrollMarginTop: "90px",
});

export const recipeTitleWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  marginBottom: "20px",
});


export const recipeCardWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "8px",
});


export const subscribeText = recipe({
  base: {
    lineHeight: "normal",
  },
  variants: {
    type: {
      mainTitle: {
        fontSize: themeVars.fontSize["text-xl"],
        color: themeVars.fontColors.black1D,
        fontWeight: themeVars.fontWeight.light,
      },
      title: {
        fontSize: themeVars.fontSize["text-lg"],
        color: themeVars.fontColors.black1D,
        fontWeight: themeVars.fontWeight.normal,
      },
      subtitle: {
        fontSize: themeVars.fontSize["text-sm"],
        color: themeVars.fontColors.black1D,
      },
      recipeTitle: {
        fontSize: themeVars.fontSize["text-sm"],
        color: themeVars.fontColors.black1D,
        fontWeight: themeVars.fontWeight.semibold,
      },
      body: {
        fontSize: themeVars.fontSize["text-md"],
        color: themeVars.fontColors.grey42,
      },
      content: {
        fontSize: themeVars.fontSize["text-sm"],
        color: themeVars.fontColors.grey42,
      },
      subtext: {
        fontSize: themeVars.fontSize["text-xs"],
        color: themeVars.fontColors.grey42,
        fontWeight: themeVars.fontWeight.normal,
      },
      description: {
        fontSize: themeVars.fontSize["text-xs"],
        color: themeVars.fontColors.grey77,
        fontWeight: themeVars.fontWeight.light,
      },
      link: {
        fontSize: themeVars.fontSize["text-xs"],
        color: themeVars.fontColors.mainRed,
        textDecoration: "underline",
      },
    },
    isBold: {
      true: {
        fontWeight: themeVars.fontWeight.semibold,
      },
      false: {},
    },
    color: {
      black: {
        color: themeVars.fontColors.black1D,
      },
      gray: {
        color: themeVars.fontColors.grey6E,
      },
      red: {
        color: themeVars.fontColors.mainRed,
      },
    },
    isSelected: {
      true: {
        color: themeVars.fontColors.darkRed,
      },
      false: {
      },
    },
    align: {
      right: {
        textAlign: 'right',
      },
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      }
    }
    
  },
  defaultVariants: {
    type: "description",
    isBold: false,
    isSelected: false,
  },
});
