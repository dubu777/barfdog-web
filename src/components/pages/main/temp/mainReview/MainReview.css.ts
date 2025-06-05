import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";

export const mainReviewWrapper = style({
  width: '100%',
  padding: '45px 0 31px',
  justifyContent: 'flex-start',
  background: 'linear-gradient(161.23deg, rgba(255, 255, 255, 0.1) 3.51%, rgba(202, 16, 16, 0.2) 94.98%)',
})

export const mainReviewButton = style({
  width: '180px',
  margin: '0 auto',
})

export const mainSliderWrapper = style({
  width: '100%',
  height: 'auto',
  margin: '29px 0',
})

export const reviewSlideItem = style({
  backgroundColor: themeVars.colors.gray.gray0,
  width: '345px !important',
  height: '411px !important',
  borderRadius: '7px',
  boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  padding: '31px 17px 14px',
  position: 'relative',
  '@media': {
    'screen and (max-width: 600px)': {
      width: '277px',
    }
  },
})

export const reviewSlideImage = style({
  width: '100% !important',
  position: 'relative',
  borderRadius: '7px',
  objectFit: 'cover',
  marginBottom: '1rem',
  aspectRatio: '4 / 3.5'
})

export const reviewSlideContents = style({
  height: '25%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
})

const textLeft = style({
  textAlign: 'left',
})

export const reviewSlideTitle = style([textLeft, {
  position: 'relative',
  height: '34px',
  '::after': {
    content: '',
    display: 'block',
    width: '100%',
    height: '1px',
    position: 'absolute',
    bottom: '12px',
    backgroundColor: themeVars.colors.gray.gray900,
  }
}])

export const reviewSlideBottomInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  fontSize: themeVars.fontSize["text-xs"],
  color: themeVars.fontColors.grey4a,
})

export const reviewSlideSubscriptionType = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '4px'
})

export const reviewRate = style({
  fontSize: themeVars.fontSize["text-lg"],
  color: themeVars.colors.red.red,
  textAlign: 'right',
  marginBottom: '5px',
})