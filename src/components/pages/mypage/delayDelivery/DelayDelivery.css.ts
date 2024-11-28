import {style} from "@vanilla-extract/css";
import {defaultWidth} from "@/styles/common.css";
import {themeVars} from "@/styles/theme.css";

export const delayDeliveryContainer = style([defaultWidth, {
  minHeight: themeVars.height.mypageInnerHeight,
  position: 'relative',
  marginBottom: '60px',
}])

export const dogName = style({
  marginBottom: '15px'
})

export const defaultProduction = style({
  lineHeight: '1.5 !important',
  marginBottom: '20px',
})