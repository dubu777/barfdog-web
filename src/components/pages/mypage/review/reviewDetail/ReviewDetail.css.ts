import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reviewDetailContainer = style({
  backgroundColor: themeVars.colors.gray.gray50,
})

export const reviewDetailBox = style({
  padding: '20px',
  backgroundColor: themeVars.colors.gray.gray0,
})

export const reviewDetailHeader = style({
  padding: '20px 20px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: themeVars.colors.gray.gray0,
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
  backgroundColor: themeVars.colors.gray.gray300,
})

export const noComment = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '40px',
})