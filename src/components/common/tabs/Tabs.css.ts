import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const tabsContainer = style({});

export const tabHeaders = style({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px 0',
});

export const tabButton = recipe({
  base: {
    cursor: 'pointer',
    fontSize: themeVars.fontSize["text-md"],
    position: 'relative',
  },
  variants: {
    type: {
      button: {
        width: '100%',
        height: '50px',
        background: themeVars.backgroundColors.greyF7,
        border: `1px solid ${themeVars.backgroundColors.greyF7}`
      },
      text: {
        ':after': {
          content: '',
          display: 'block',
          width: '120%',
          height: '3px',
          background: themeVars.colors.red.red,
          position: 'absolute',
          bottom: '-11px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0,
          transition: 'all .35s',
        },
      }
    },
    active: {
      true: {
        ':after': {
          opacity: 1,
        },
      }
    }
  },
  compoundVariants: [
    {
      variants: { type: 'button', active: true },
      style: {
        background: themeVars.colors.gray.gray0,
      },
    },
  ]
});

export const tabContent = style({});
