import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const selectWrapper = style({
  position: 'relative',
  width: '100%',
  minWidth: '12.5rem',
});

export const viewer = style({
  cursor: 'pointer',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.6rem',
  height: '3.125rem',
  marginBottom: '.25rem',
  backgroundColor: themeVars.backgroundColors.white,
  border: `1px solid ${themeVars.borderColors.greyDD}`,
  fontSize: themeVars.fontSize['text-md'],
  color: themeVars.fonColors.grey89,
});

export const optionsContainer = style({
  position: 'absolute',
  left: '50%',
  bottom: '0',
  transform: 'translate(-50%, 100%)',
  width: '100%',
  height: '12.5rem',
  margin: 'auto',
  overflow: 'hidden',
  padding: '0.3125rem',
  backgroundColor: themeVars.colors.white,
  border: `0.0625rem solid ${themeVars.borderColors.greyBB}`,
  borderRadius: '0.25rem',
  zIndex: 10,
  boxShadow: '0 0 1.5625rem rgba(0, 0, 0, 0.1)',
});

export const optionsWrapper = style({
  overflowY: 'scroll',
  height: '8.5375rem',
  '::-webkit-scrollbar': {
    width: '8px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: themeVars.colors.white,
    border: `0.0625rem solid ${themeVars.borderColors.greyBB}`,
    borderRadius: '10px',
  },

  '::-webkit-scrollbar-track': {
    backgroundColor: themeVars.borderColors.greyBB,
    borderRadius: '10px',
  },
});
export const option = style({
  padding: '0.5rem',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: themeVars.backgroundColors.greyF7,
    },
    '&[data-selected="true"]': {
      backgroundColor: themeVars.colors.mainRed,
      color: themeVars.colors.white,
    },
  },
});

export const inputStyle = style({
  width: '100%',
  padding: '0.25rem',
  marginBottom: '0.5rem',
  height: '2.75rem',
  outline: '0',
  border: `0.0625rem solid ${themeVars.borderColors.greyBB}`,
  borderRadius: '0.25rem',
  selectors: {
    '&:focus': {
      borderColor: themeVars.borderColors.mainRed,
    }
  }
});


