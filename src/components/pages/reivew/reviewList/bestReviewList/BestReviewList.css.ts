import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const bestReviewSlider = style({
  marginTop: '20px',
  height: '100%',
})

export const bestReviewScrollbar = style({
  width: 'calc(100% - 40px)',
  margin: '16px auto 0',
  height: '8px',
  backgroundColor: themeVars.backgroundColors.greyD9,
  borderRadius: '8px',
});

globalStyle(`${bestReviewScrollbar} .swiper-scrollbar-drag`, {
  backgroundColor: themeVars.backgroundColors.greyA6,
  borderRadius: '8px',
})

export const bestReview = style({
  width: '40% !important',
  maxWidth: '240px',
  border: `1px solid ${themeVars.borderColors.greyBB}`,
  borderRadius: '5px',
  cursor: 'pointer',
})

export const bestReviewImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
})

export const bestReviewInfo = style({
  padding: '16px'
})

export const bestReviewTop = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '10px 0'
})

export const username = style({
  borderTop: `1px solid ${themeVars.borderColors.greyDD}`,
  marginTop: '10px',
  paddingTop: '10px',
})