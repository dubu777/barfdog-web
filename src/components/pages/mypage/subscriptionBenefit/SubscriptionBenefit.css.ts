import { style } from "@vanilla-extract/css";
import { defaultWidth } from "@/styles/common.css";
import { themeVars } from "@/styles/theme.css";

export const benefitsContainer = style([defaultWidth,{
  height: themeVars.height.mypageInnerHeight,
  position: 'relative',
}])

export const benefitsTitle = style({
  marginBottom: '25px',
});

export const benefitsControls = style({
  display: 'flex',
  gap: '35px',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

