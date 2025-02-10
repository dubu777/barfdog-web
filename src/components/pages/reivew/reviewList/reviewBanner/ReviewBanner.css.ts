import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reviewBannerContainer = style({
  width: '100%',
  height: '82px',
  background: themeVars.backgroundColors.darkOpacity90,
  margin: '60px 0 40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
});

export const yellowPoint = style({
  color: themeVars.fontColors.yellow
});