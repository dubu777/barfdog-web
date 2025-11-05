import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const accountRecommendationCode = style({
  textAlign: 'left',
  marginLeft: '43.5px',
  marginBottom: '6px',
  marginTop: 'unset !important',
})

export const rewardItem = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: 'calc(100% / 2)',
    backgroundColor: themeVars.colors.gray.gray0,
    padding: '12px 20px',
  },
  variants: {
    isDisabled: {
      true: {
        boxShadow: themeVars.shadow.light,
        selectors: {
          '&:first-child': {
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          },
          '&:last-child': {
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
          },
        }
      },
      false: {
        cursor: 'pointer',
      }
    }
  }
})

export const userRewardLine = style({
  height: '48px',
})