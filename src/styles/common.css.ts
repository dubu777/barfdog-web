import { themeVars } from './theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from "@vanilla-extract/recipes";

export const commonLayoutStyle = style({
  width: '100%',
  minWidth: '320px',
  maxWidth: '600px',
  margin: '0 auto',
})

export const commonLayoutContainer = style([commonLayoutStyle, {
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: themeVars.colors.white,
  borderRight: `1px solid ${themeVars.borderColors.greyED}`,
  borderLeft: `1px solid ${themeVars.borderColors.greyED}`,
  '-ms-user-select': 'none',
  '-moz-user-select': '-moz-none',
  '-webkit-user-select': 'none',
  '-khtml-user-select': 'none',
  'user-select': 'none',
}]);

export const ellipsis = recipe({
  base: {
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
  },
  variants: {
    lineSize: {
      line1: {
        whiteSpace: 'nowrap',
        display: 'block',
        webkitLineClamp: 'none',
        webkitBoxOrient: 'none',
      },
      line2: {
        '-webkit-line-clamp': '2',
      },
      line3: {
        '-webkit-line-clamp': '3',
      },
    },
    wordBreak: {
      keep: {
        wordBreak: 'keep-all'
      }
    },
    whiteSpace: {
      pre: {
        whiteSpace: 'pre-line',
      }
    }
  },
})
export const pointColor = style({ color: themeVars.colors.mainRed });