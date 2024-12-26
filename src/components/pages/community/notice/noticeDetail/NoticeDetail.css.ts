import {globalStyle, style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";
import {recipe} from "@vanilla-extract/recipes";

export const noticeDetailContainer = style({
  marginTop: '64px',
  paddingTop: '30px',
  marginBottom: '60px',
})

export const noticeHeader = style({
  borderTop: `1px solid ${themeVars.borderColors.black}`,
  marginTop: '40px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

export const noticeHeaderItem = style({
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${themeVars.borderColors.greyBB}`,
})

export const headerTitle = recipe({
  base: {
    display: 'block',
    height: '100%',
    padding: '10px 20px',
  },
  variants: {
    isTitle: {
      true: {
        width: '15%',
        background: themeVars.borderColors.greyED,
      }
    }
  }
})

export const noticeContents = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
})

globalStyle(`${noticeContents} img`, {
  width: '100%',
  maxWidth: '600px',
  height: 'auto',
  display: 'block',
  margin: '0 auto',
});

export const moveToNoticeList = style({
  width: '30%',
  margin: '0 auto 40px',
})

export const noticeNavigation = style({
  borderTop: `1px solid ${themeVars.borderColors.black}`
})

export const navigationItem = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: `1px solid ${themeVars.borderColors.greyBB}`,
})

export const navTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  marginRight: '60px'
})

export const navLink = style({
  cursor: 'pointer',
})

export const prevArrow = style({
  transform: 'rotate(180deg)',
})
