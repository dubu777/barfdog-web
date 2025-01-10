import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const title = recipe({
  base: {
    fontStyle: 'normal',
    fontWeight: themeVars.fontWeight.normal,
    fontSize: '23px',
    zIndex: 100,
    lineHeight: 'normal',
    textAlign: 'center',
  },
  variants: {
    size: {
      md: {
        fontSize: themeVars.fontSize["text-md"],
        fontWeight: themeVars.fontWeight.semibold,
      },
      lg: {
        fontSize: themeVars.fontSize["text-lg"],
        letterSpacing: '-0.05em',
      },
      titleMd: {
        fontSize: themeVars.fontSize["title-md"],
        fontWeight: themeVars.fontWeight.semibold,
        letterSpacing: '-0.06em',
      },
      titleLg: {
        fontSize: themeVars.fontSize["title-lg"],
        letterSpacing: '-0.06em',
      },
      titleXl: {
        fontSize: themeVars.fontSize["title-xl"],
        letterSpacing: '-0.01em',
      },
      titleXXl: {
        fontSize: themeVars.fontSize["title-xxl"],
        letterSpacing: '-0.01em',
      },
    },
    color: {
      white: {
        color: themeVars.colors.white
      },
      red: {
        color: themeVars.colors.mainRed
      },
      grey: {
        color: `${themeVars.fontColors.grey89} !important`,
      },
    },
    weight: {
      light: {
        fontWeight: themeVars.fontWeight.light,
      },
      normal: {
        fontWeight: themeVars.fontWeight.normal,
      },
      semibold: {
        fontWeight: themeVars.fontWeight.semibold,
      },
      bold: {
        fontWeight: themeVars.fontWeight.bold,
      },
    },
    align: {
      left: {
        textAlign: 'left',
      },
    },
    isEmpty: {
      true: {
        padding: '60px 0'
      }
    }
  },
  defaultVariants: {
    size: 'titleLg',
  }
})


export const description = recipe({
  base: {
    fontWeight: themeVars.fontWeight.normal,
    fontSize: themeVars.fontSize["text-sm"],
    letterSpacing: '-0.05em',
    lineHeight: 'normal',
    zIndex: 100,
    whiteSpace: 'pre-line'
  },
  variants: {
    size: {
      xs: {
        fontSize: themeVars.fontSize["text-xs"],
      },
      sm: {
        fontSize: themeVars.fontSize["text-sm"],
        fontWeight: themeVars.fontWeight.light,
      },
      md: {
        fontSize: themeVars.fontSize["text-md"],
        fontWeight: themeVars.fontWeight.semibold,
        letterSpacing: '-0.01em',
      },
    },
    color: {
      grey: {
        color: `${themeVars.fontColors.grey89} !important`,
      },
      white: {
        color: themeVars.colors.white,
      },
      black: {
        color: themeVars.colors.black,
      },
      red: {
        color: themeVars.colors.mainRed,
      },
    },
    align: {
      center: {
        textAlign: 'center',
      },
      left: {
        textAlign: 'left',
      },
      right: {
        textAlign: 'right',
      }
    },
    weight: {
      light: {
        fontWeight: themeVars.fontWeight.light,
      },
      normal: {
        fontWeight: themeVars.fontWeight.normal,
      },
      bold: {
        fontWeight: themeVars.fontWeight.bold,
      }
    },
    pageName: {
      myPage: {
        color: themeVars.colors.black,
        lineHeight: 1.5,
        textAlign: 'left',
      }
    },
    lineHeight: {
      inherit: {
        lineHeight: 'inherit'
      }
    },
    isEmpty: {
      true: {
        padding: '60px 0'
      }
    }
  },
  defaultVariants: {
    color: 'white',
    align: 'center',
  },
})
