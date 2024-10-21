import { style, globalStyle } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const selectBoxContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

export const selectInputWrapper = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const inputField = style({
  fontSize: themeVars.fontSize["text-md"],
  textAlign: 'center',
  width: '100%',
  height: '100%',
  outline: '0',
  padding: '4px 8px',
  minHeight: '54px',
  borderRadius: '9px',
  border: `1px solid ${themeVars.borderColors.greyDD}`,
  cursor: 'pointer',
  // zIndex: 3,
});

export const frontWord = style({
  fontSize: themeVars.fontSize["text-md"],
  marginRight: '13px',
  minWidth: '60px',
});

export const unit = style({
  position: 'absolute',
  fontSize: themeVars.fontSize["text-md"],
  right: '1.25rem',
  top: '50%',
  transform: 'translateY(-50%)',
});

export const optionsContainer = style({
  position: 'absolute',
  left: '0',
  top: '100%',
  width: '100%',
  zIndex: 2,
  borderRadius: '0.5rem',
  fontSize: themeVars.fontSize["text-md"],
  boxShadow: '0 0 1.5625rem rgba(0, 0, 0, 0.1)',
  backgroundColor: themeVars.colors.white,
});



export const optionsWrapper = style({
  maxHeight: '12.5rem',
  overflowY: 'scroll',
  paddingBottom: '0.625rem',
});

globalStyle(`${optionsWrapper}::-webkit-scrollbar`, {
  display: "none",
});

export const option = style({
  transitionTimingFunction: 'ease',
  transitionDuration: '0.3s',
  transitionProperty: 'background, color',
  padding: '0.25rem 0.9375rem',
  height: '2.375rem',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  selectors: {
    '&[data-selected="true"]': {
      backgroundColor: themeVars.backgroundColors.greyF2,
    },
    '&:hover': {
      backgroundColor: themeVars.backgroundColors.greyF7,
    },
  },
});