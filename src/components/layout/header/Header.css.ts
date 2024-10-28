import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const headerContainer = recipe({
  base: {
    width: '100%',
    minWidth: '320px',
    maxWidth: '600px',
    margin: '0 auto',
    minHeight: '62px',
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    type: {
      default: {
      },
      redBackground: {
        backgroundColor: themeVars.colors.mainRed,
      },
      withBackButton: {
      },
      backButtonOnly: {
      },
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

export const headerWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
  width: '100%',
});

export const headerMenuWrapper = style({
  display: 'flex',
  gap: '19px',
  alignItems: 'center',
});
export const backButton = style({
  cursor: 'pointer',
});
