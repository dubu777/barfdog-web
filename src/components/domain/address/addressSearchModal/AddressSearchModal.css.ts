import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const addressSearchModal = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '20px',
  maxWidth: "560px",
  width: '90%',
  backgroundColor: themeVars.colors.gray.gray0,
  borderRadius: "8px",
  '@media': {
    'screen and (max-width: 360px)': {
      width: '100%',
    },
  },
})

export const closeButtonWrapper = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  alignSelf: "stretch"
})