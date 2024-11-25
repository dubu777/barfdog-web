import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { defaultWidth } from "@/styles/common.css";

export const menuContainer = style([defaultWidth, {
  display: 'flex',
  flexWrap: 'wrap',
  paddingTop: '49px',
  paddingBottom: '5px'
}])

export const menuItem = style({
  width: 'calc(100% / 3)',
  marginBottom: '39px'
})

export const menuIcon = style({
  marginBottom: '12px'
})

export const bottomMenuWrapper = style({
  background: themeVars.backgroundColors.greyOpacity,
})

export const bottomMenuContainer = style([defaultWidth, {
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '15px',
  paddingBottom: '31px',
  fontSize: themeVars.fontSize["text-sm"],
}])

export const bottomMenuRight = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})