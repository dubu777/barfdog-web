import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const bestReviewBox = style({
  padding: '20px 0 !important',
  background: themeVars.colors.gray.gray50,
})

export const bestReviewSlide = style({
  width: 'calc(100% - 40px) !important',
})

export const bestReviewCard = style({
  display: 'flex',
  gap: '12px',
  cursor: 'pointer',
})

export const bestReviewBanner = style({
  background: themeVars.colors.red.red,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  padding: '6px 16px',
  transition: 'all .35s',
  position: 'relative',
  selectors: {
    '&:hover': {
      background: themeVars.colors.gray.gray0,
      color: themeVars.colors.red.red,
    }
  }
})

export const bestReviewBannerStar = recipe({
  base: {
    position: 'absolute',
  },
  variants: {
    xPosition: {
      left: {
        left: '22%',
        top: '-2px',
      },
      right: {
        right: '42px',
        bottom: '-5px',
      }
    }
  }
})