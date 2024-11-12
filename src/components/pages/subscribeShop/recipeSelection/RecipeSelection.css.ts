import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const recipeSelectionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

export const subscribeTextWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  marginBottom: '40px',
  gap: '5px',
});

export const recipeCardWrapper = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
  marginTop: '20px',
});

export const recipesWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '40px',
});


export const subscribeText = recipe({
  base: {
      lineHeight: 'normal',
  },
  variants: {
      type: {
          mainTitle: {
              fontSize: themeVars.fontSize["text-xl"],
              color: themeVars.fontColors.grey77,
              fontWeight: themeVars.fontWeight.semibold,
          },
          title: {
              fontSize: themeVars.fontSize["text-lg"],
              color: themeVars.fontColors.grey42,
              fontWeight: themeVars.fontWeight.semibold,
          },
          subtitle: {
              fontSize: themeVars.fontSize["text-sm"],
              color: themeVars.fontColors.grey4F,
          },
          recipeTitle: {
            fontSize: themeVars.fontSize["text-sm"],
            color: themeVars.fontColors.grey4D,
            fontWeight: themeVars.fontWeight.semibold,
          },
          body: {
            fontSize: themeVars.fontSize["text-md"],
            color: themeVars.fontColors.grey4F,
        },
          description: {
              fontSize: themeVars.fontSize["text-xs"],
              color: themeVars.fontColors.grey77,
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
        false: {

        },
      },
      color: {
        black: themeVars.fontColors.grey42,
        gray: themeVars.fontColors.grey77,
      }

  },
  defaultVariants: {
      type: 'description',
      color: 'black',
      isBold: false,
  }
});