import { style, globalStyle } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const selectBoxContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  
});

export const selectInputWrapper = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const inputField = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: themeVars.fontSize["text-sm"],
    width: '100%',
    height: '100%',
    borderRadius: '9px',
    backgroundColor: themeVars.backgroundColors.white,
    border: `1px solid ${themeVars.borderColors.greyDD}`,
    cursor: 'pointer',
  },
variants: {
  size: {
    lg: {
      minHeight: '45px',
    },
    md: {
      minHeight: '35px',
    },
  },
},
defaultVariants: {
  size: 'lg'
}

});

export const frontWord = style({
  fontSize: themeVars.fontSize["text-sm"],
  minWidth: '60px',
});

export const unit = style({
  position: 'absolute',
  fontSize: themeVars.fontSize["text-sm"],
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
  fontSize: themeVars.fontSize["text-sm"],
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