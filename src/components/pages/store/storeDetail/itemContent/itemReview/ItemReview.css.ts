import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const itemReviewContainer = style({})

export const itemReviewTop = style({
  background: themeVars.backgroundColors.greyF7,
  padding: '1rem 0',
  margin: '0 10px',
})

export const averageStar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const createAdminReview = style({
  margin: '20px 0'
})

export const reviewAccordionTitleBox = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const accordionTitleLeft = style({
  width: '60%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const accordionTitleRight = style({
  width: '20%',
})

export const reviewAccordionBox = style({
  background: themeVars.backgroundColors.greyF7,
})