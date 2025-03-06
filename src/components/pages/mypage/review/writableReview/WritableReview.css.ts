import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const writableReviewContainer = recipe({
  base: {},
  variants: {
    isEmpty: {
      true: {
        padding: '50px 0 150px',
      }
    }
  }
})

export const writableList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
})

export const writableReview = style({
  borderBottom: `1px solid ${themeVars.colors.gray.gray300}`,
})

export const reviewInfo = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem',
})

export const createReviewButton = style({
  marginLeft: 'auto',
})