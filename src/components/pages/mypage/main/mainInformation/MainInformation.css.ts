import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const userInfoContainer = style({
  backgroundColor: themeVars.colors.gray.gray50,
})

export const accountLinkBox = style({
  padding: '20px',
})

export const accountRecommendationCode = style({
  textAlign: 'left',
  marginLeft: '43.5px',
  marginBottom: '6px',
  marginTop: 'unset !important',
})

export const accountLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

export const accountImage = style({
  borderRadius: '50%',
  objectFit: 'cover',
})

export const membership = style({
  backgroundColor: themeVars.colors.gray.gray0,
  padding: '18px 20px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})

export const membershipInfoTop = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const userReward = style({
  display: 'flex',
  alignItems: 'center',
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

export const userRewardTitle = style({
  display: 'flex',
  alignItems: 'center',
})

export const userRewardLine = style({
  height: '48px',
})