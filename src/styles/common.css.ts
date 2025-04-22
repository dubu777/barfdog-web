import { themeVars } from './theme.css';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from "@vanilla-extract/recipes";
import { he } from 'date-fns/locale';

export const commonLayoutStyle = style({
  width: '100%',
  minWidth: '320px',
  maxWidth: '600px',
  margin: '0 auto',
})

export const commonLayoutContainer = style([commonLayoutStyle, {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: themeVars.colors.gray.gray0,
  '-ms-user-select': 'none',
  '-moz-user-select': '-moz-none',
  '-webkit-user-select': 'none',
  '-khtml-user-select': 'none',
  'user-select': 'none',
  position: 'relative',
}]);


export const ellipsis = recipe({
  base: {
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box !important',
    '-webkit-box-orient': 'vertical',
  },
  variants: {
    lineSize: {
      line1: {
        whiteSpace: 'nowrap',
        webkitLineClamp: 'none',
        webkitBoxOrient: 'none',
        lineHeight: 'normal',
      },
      line2: {
        '-webkit-line-clamp': '2',
      },
      line3: {
        '-webkit-line-clamp': '3',
      },
      line4: {
        '-webkit-line-clamp': '4',
      },
      line5: {
        '-webkit-line-clamp': '5',
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
    },
    align: {
      center: {
        textAlign: 'center'
      },
      left: {
        textAlign: 'left',
      }
    }
  },
})
export const pointColor = style({ color: themeVars.colors.red.red });


export const defaultWidth = style({
  minWidth: '335px',
  width: '80%',
  marginTop: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '60px',
})

export const inlineBlockSpan = style({
  display: 'inline-block',
  marginLeft: '8px',
});


export const sanitizedHTML = style({})


globalStyle(`${sanitizedHTML} *`, {
  textAlign: 'unset',
  font: 'auto'
});

globalStyle(`${sanitizedHTML} img`, {
  width: '100%',
  maxWidth: '600px',
  height: 'auto',
  display: 'block',
  margin: '0 auto',
});

globalStyle(`${sanitizedHTML} h2`, {
  fontSize: themeVars.fontSize["title-md"],
});

globalStyle(`${sanitizedHTML} b, strong`, {
  fontWeight: themeVars.fontWeight.bold,
});


export const commonWrapper = recipe({
  base: {
    display: "flex",
    width: "100%",
  },
  variants: {
    gap: {
      0: {
        gap: "0",
      },
      2: {
        gap: "2px"
      },
      4: {
        gap: "4px"
      },
      8: {
        gap: "8px"
      },
      12: {
        gap: "12px"
      },
      16: {
        gap: "16px"
      },
      20: {
        gap: "20px"
      },
    },
    direction: {
      col: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
    },
    justify: {
      center: {
        justifyContent: "center",
      },
      start: {
        justifyContent: "flex-start",
      },
      between: {
        justifyContent: "space-between",
      },
    },
    align: {
      center: {
        alignItems: "center",
      },
      start: {
        alignItems: "flex-start", 
      },
      between: {
        alignItems: "space-between",
      },
    },
    height: {
      fit: {
        height: "fit-content",
      },
      full: {
        height: "100vh",
      },
    },
  },
  defaultVariants: {
    gap: 0,
    direction: "row",
    justify: "center",
    align: "center",
    height: "fit",
  },
});