import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const headerContainer = recipe({
  base: {
    position: 'fixed',
    top: 0,
    background: themeVars.colors.white,
    zIndex: 200,
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
  padding: '18px 25px',
});

export const headerMenuWrapper = style({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  cursor: 'pointer',
});

export const headerButton = style({
  cursor: 'pointer',
});

export const logo = style({
  display: 'flex',
})

export const cartButton = style({
  position: 'relative',
})

export const cartCount = style({
  position: 'absolute',
  width: '17px',
  height: '18px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: themeVars.colors.white,
  fontSize: themeVars.fontSize["text-xs"],
  top: -11,
  right: -5,
  background: `url('/images/icons/cartCircle.png') no-repeat center center / 17px 17px`,
})