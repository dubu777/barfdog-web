import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

export const stepContainer = style({
  width: '600px',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  gap: '100px',
  color: themeVars.fontColors.mainRed,
  textAlign: 'center',
  position: 'relative',
  marginBottom: '50px',

  '@media': {
    'screen and (max-width: 500px)': {
      width: '380px',
      gap: '30px',
    },
  },
});

export const stepLine = style({
  position: 'absolute',
  top: '30%',
  height: '3px',
  width: '60%',
  backgroundColor: themeVars.backgroundColors.mainRed,
});

export const stepBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});


export const stepCircle = recipe({
  base: {
    border: `3px solid ${themeVars.borderColors.mainRed}`,
    backgroundColor: themeVars.backgroundColors.pinkFa,
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "14px",
    zIndex: 1,
  },
  variants: {
    active: {
      true: {
        backgroundColor: themeVars.backgroundColors.mainRed,
      },
      false: {},
    },
  },
});


export const stepNumber = recipe({
  base: {
    fontSize: themeVars.fontSize['text-md'],
    fontWeight: "bold",
  },
  variants: {
    active: {
      true: {
        color: themeVars.fontColors.white
      },
      false: {
        color: themeVars.fontColors.mainRed
      },
    },
  },
});
export const activeStepNumber = style({
  color: 'white',
});

export const stepText = style({
  color: '#be1a21',
});
