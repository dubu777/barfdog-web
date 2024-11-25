import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { defaultWidth } from "@/styles/common.css";

export const orderListContainer = style([defaultWidth, {
  display: 'flex',
  flexDirection: 'column',
  gap: '49px',
  padding: '0 29px'
}]);

export const itemHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '11px',
  borderBottom: `1px solid ${themeVars.buttonColors.greyB9}`,
});

export const itemContents = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '11px 0 17px',
  gap: '10px'
});

export const itemContent = style({
  display: 'flex',
  gap: '26px',
  fontSize: themeVars.fontSize["text-sm"],
});

export const contentTitle = style({
  width: '20%',
  textAlign: 'left',
});

export const itemButtonControls = style({
  display: 'flex',
  gap: '10px'
});