import { style } from "@vanilla-extract/css";
import {recipe} from "@vanilla-extract/recipes";

export const writableReviewContainer = recipe({
  base: {
    padding: '1rem',
  },
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
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
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