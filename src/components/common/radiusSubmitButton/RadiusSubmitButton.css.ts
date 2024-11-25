import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";

export const submitButton = style({
  width: '100%',
  height: '46px',
  background: themeVars.colors.mainRed,
  color: themeVars.colors.white,
  borderTopLeftRadius: '30px',
  borderTopRightRadius: '30px',
  marginTop: 'auto',
  position: 'absolute',
  bottom: 0,
  left: 0,
  fontWeight: themeVars.fontWeight.semibold,
  cursor: 'pointer',
  ':disabled': {
    background: themeVars.colors.lightGrey,
    cursor: 'default'
  }
})