import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const rateBox = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    align: {
      left: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      right: {
        justifyContent: 'flex-end'
      }
    },
    inlineBlock: {
      true: {
        display: 'inline-block'
      }
    }
  }
})

export const rate = recipe({
  base: {
    fontSize: themeVars.fontSize["text-lg"],
    textAlign: 'right',
    marginBottom: '5px',
    transition: 'all .35s'
  },
  variants: {
    color: {
      red: {
        color: themeVars.colors.red.red,
      },
      yellow: {
        color: themeVars.fontColors.yellow,
      },
      black: {
        color: themeVars.colors.gray.gray900,
      }
    },
    empty: {
      true: {
        color: themeVars.colors.gray.gray400,
      },
    },
    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
    },
    isEdit: {
      true: {
        fontSize: themeVars.fontSize["title-lg"],
        cursor: 'pointer',
        margin: '0 2px'
      }
    },
    size: {
      xxl: {
        fontSize: themeVars.fontSize["title-xxl"],
        margin: '0 2.5px'
      }
    }
  }
})
