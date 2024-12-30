import { style, globalStyle } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import {recipe} from "@vanilla-extract/recipes";

export const selectBoxContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  zIndex: 300,
  position: 'relative',
});

export const selectInputWrapper = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  ':after': {
    content: '',
    display: 'block',
    width: '10px',
    height: '10px',
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    background: `url('/images/icons/filter-arrow.png') no-repeat center center / 10px 5px`,
  }
});

export const inputField = recipe({
 base: {
   fontSize: themeVars.fontSize["text-md"],
   textAlign: 'center',
   width: '100%',
   height: '100%',
   outline: '0',
   padding: '4px 8px',
   minHeight: '45px',
   borderRadius: '9px',
   border: `1px solid ${themeVars.borderColors.greyDD}`,
   cursor: 'pointer',
 },
  variants: {
   forFilter: {
     true: {
       border: 0,
       borderRadius: 0,
       height: 'auto',
       minHeight: 'unset',
       padding: 0,
       paddingRight: '15px',
       textAlign: 'right',
     }
   }
  }
});

export const frontWord = style({
  fontSize: themeVars.fontSize["text-md"],
  marginRight: '13px',
  minWidth: '60px',
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