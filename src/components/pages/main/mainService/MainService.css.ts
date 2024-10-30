import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";

export const mainServiceWrapper = style( {
  display: 'flex',
  flexDirection: 'column',
  padding: '66px 61px 21px',
  minHeight: '100vh',
  justifyContent: 'flex-start',
  whiteSpace: 'pre',
  '@media': {
    'screen and (max-width: 600px)': {
      padding: '66px 50px 21px',
    }
  },
})

export const mainServiceBox = style({
  paddingBottom: '77px',
  position: 'relative',
  '::after': {
    content: '',
    display: 'block',
    width: '1px',
    height: '32px',
    background: themeVars.colors.black,
    position: 'absolute',
    left: '50%',
    bottom: '22px'
  }
})

export const mainServiceListItem = style({
  marginBottom: '42px',
  ':last-child': {
    marginBottom: 0,
  },
})