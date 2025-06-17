import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const mainTitle = recipe({
  base: {
    fontStyle: "normal",
    fontWeight: themeVars.fontWeight.bold,
    fontSize: "23px",
    zIndex: 100,
    lineHeight: "normal",
    textAlign: "center",
  },
  variants: {
    size: {
      md: {
        fontSize: themeVars.fontSize["text-md"],
        fontWeight: themeVars.fontWeight.semibold,
        letterSpacing: "-0.04em",
      },
      lg: {
        fontSize: themeVars.fontSize["text-lg"],
        letterSpacing: "-0.05em",
      },
      titleLg: {
        fontSize: themeVars.fontSize["title-lg"],
        letterSpacing: "-0.06em",
      },
      titleXl: {
        fontSize: themeVars.fontSize["title-xl"],
        letterSpacing: "-0.01em",
      },
      titleXXl: {
        fontSize: themeVars.fontSize["title-xxl"],
        letterSpacing: "-0.01em",
      },
    },
    color: {
      white: {
        color: themeVars.colors.gray.gray0,
      },
    },
    weight: {
      normal: {
        fontWeight: themeVars.fontWeight.normal,
      },
    },
  },
  defaultVariants: {
    size: "titleLg",
  },
});

export const mainDescription = recipe({
  base: {
    fontWeight: themeVars.fontWeight.normal,
    fontSize: themeVars.fontSize["text-sm"],
    letterSpacing: "-0.05em",
    lineHeight: "normal",
    zIndex: 100,
    whiteSpace: "pre-line",
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
        letterSpacing: "-0.01em",
      },
    },
    color: {
      grey: {
        color: themeVars.colors.gray.gray700,
      },
      white: {
        color: themeVars.colors.gray.gray0,
      },
      black: {
        color: themeVars.colors.gray.gray900,
      },
    },
    align: {
      center: {
        textAlign: "center",
      },
      left: {
        textAlign: "left",
      },
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
      },
    },
  },
  defaultVariants: {
    color: "white",
    align: "center",
  },
});
