import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const tabsContainer = style({});

export const tabHeaders = style({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: `1px solid ${themeVars.borderColors.greyBB}`
});

export const tabButton = recipe({
  base: {
    cursor: 'pointer',
    fontSize: themeVars.fontSize["text-md"],
    position: 'relative',
    ':after': {
      content: '',
      display: 'block',
      width: '120%',
      height: '3px',
      background: themeVars.colors.red,
      position: 'absolute',
      bottom: '-11px',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: 0,
      transition: 'all .35s',
    },
  },
  variants: {
    active: {
      true: {
        ':after': {
          opacity: 1,
        },
      }
    }
  }
});

export const tabContent = style({});
