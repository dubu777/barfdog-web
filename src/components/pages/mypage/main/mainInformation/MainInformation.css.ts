import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const userInfoContainer = style({
  background: themeVars.colors.gray.gray50,
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
})

export const accountImage = style({
  borderRadius: '50%',
  objectFit: 'cover',
})

export const userName = style({
  marginLeft: '16px',
  marginRight: '12px',
})

export const membership = style({
  background: themeVars.colors.gray.gray0,
  padding: '12px 20px',
})

export const membershipInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${themeVars.colors.gray.gray200}`,
  paddingBottom: '8px',
  marginBottom: '8px',
})

export const userReward = style({
  display: 'flex',
  gap: '4px',
  marginTop: '4px',
})

export const rewardItem = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: 'calc(100% / 3)',
    background: themeVars.colors.gray.gray0,
    padding: '8px 20px',
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