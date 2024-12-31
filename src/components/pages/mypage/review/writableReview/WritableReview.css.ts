import { style } from "@vanilla-extract/css";

export const writableReviewContainer = style({
  padding: '1rem',
})

export const writableList = style({
  display: 'flex',
  flexDirection: 'column',
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