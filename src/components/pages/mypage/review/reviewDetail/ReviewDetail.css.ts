import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reviewDetailContainer = style({
  background: themeVars.colors.gray.gray50,
})

export const reviewDetailBox = style({
  padding: '20px',
  background: themeVars.colors.gray.gray0,
})

export const reviewDetailHeader = style({
  padding: '20px 20px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: themeVars.colors.gray.gray0,
})

export const reviewDetailContents = style({
  margin: '4px 0',
  maxHeight: '260px',
  overflow: 'scroll',
})

export const likeCommentCount = style({
  marginTop: '20px',
})

export const reviewDetailComment = style({
  padding: '20px',
})

export const commentHeader = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '6px',
  marginBottom: '5px',
})

export const profile = style({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: themeVars.colors.gray.gray300,
})

export const noComment = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '40px',
})

export const reviewDetailImageList = style({
  padding: '20px',
  width: '100%',
  position: 'relative',

})

export const reviewImageSlider = style({
  width: '100%',
  height: 'auto !important',
  position: 'relative',
  borderRadius: '8px',
})

export const reviewImage = style({
  position: 'static !important',
  width: '100%',
  aspectRatio: '1 / 1',
  // maxHeight: '335px',
  // objectFit: 'cover',
  objectFit: 'cover',
  borderRadius: '8px',
})

export const reviewImageCountChip = style({
  position: 'absolute !important',
  top: '16px',
  right: '16px',
})