import { globalStyle, style } from "@vanilla-extract/css";

export const bestReviewModalContainer = style({
  width: '100%',
})

export const reviewImageSlider = style({
  width: '100%',
  margin: '20px 0'
})

globalStyle(`${reviewImageSlider} img`, {
  borderRadius: '15px',
  objectFit: 'cover',

})
export const reviewTitleWithRate = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const reviewUsername = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '50px',
})