import { themeVars } from "@/styles/theme.css";
import { style } from '@vanilla-extract/css';
import { recipe } from "@vanilla-extract/recipes";

export const footerContainer = recipe({
  base: {
    zIndex: 20,
    backgroundColor: themeVars.backgroundColors.grey7E,
    color: themeVars.colors.white,
    padding: '14px 25px',
  },
  variants: {
    isBottomBannerVisible: {
      true: {
        marginBottom: '39px !important',
      },
      false: {
        marginBottom: '0',
      }
    }
  }
});

export const footerButton = recipe({
  base: {
    width: '100%',
    color: themeVars.colors.white,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
    padding: 0,
    cursor: 'pointer',
  },
  variants: {
    open: {
      true: {
        marginBottom: '15px'
      },
      false: {
        marginBottom: '0'
      }
    }
  }
});

export const footerInfo = recipe({
  base: {
    transition: 'all .35s',
    overflow: 'hidden',
  },
  variants: {
    open: {
      true: {
        height: 'auto',
      },
      false: {
        height: '0',
      }
    }
  }
})

export const footerText = style({
  fontWeight: themeVars.fontWeight.light,
  fontSize: themeVars.fontSize["text-xs"],
  lineHeight: '17px',
  textAlign: 'left',
})

export const footerPolicy = style({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginTop: '19px',
})

export const terms = style({
  position: 'relative',
  '::after': {
    content: '',
    display: 'block',
    width: '1px',
    height: '90%',
    background: themeVars.colors.white,
    position: 'absolute',
    left: '-10px',
    top: '50%',
    transform: 'translateY(-50%)'
  }
})