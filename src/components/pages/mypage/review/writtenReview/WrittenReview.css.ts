import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import {recipe} from "@vanilla-extract/recipes";

export const writtenReviewContainer = recipe({
  base: {},
  variants: {
    isEmpty: {
      true: {
        padding: '50px 0 150px',
      }
    }
  }
})

export const writtenList = style({ })

export const writtenReview = style({
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
  padding: '1rem 0',
  borderBottom: `1px solid ${themeVars.borderColors.greyBB}`,
});

export const reviewInfo = style({
  width: '65%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
})

export const reviewImageButton = recipe({
  base: {
    position: 'relative',
    width: '150px',
    height: '150px',
  },
  variants: {
    openReviewImages: {
      true: {
        cursor: 'pointer',
      }
    }
  }
})

export const reviewImage = style({
  border: `1px solid ${themeVars.borderColors.greyDD}`,
  objectFit: 'cover',
})

export const imageCount = style({
  width: '30px',
  height: '30px',
  position: 'absolute',
  bottom: 0,
  right: 0,
  background: themeVars.colors.gray.gray900,
  color: themeVars.colors.gray.gray0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: themeVars.fontSize["text-sm"]
})

export const reviewTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

export const reviewStatus = style({
  width: '20%',
  marginLeft: 'auto',
})

export const writtenButtonControls = style({
  width: '15%',
  marginLeft: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
})