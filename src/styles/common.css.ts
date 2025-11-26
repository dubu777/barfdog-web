import { themeVars } from "./theme.css";
import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const commonLayoutContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "100%",
  minWidth: "320px",
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: themeVars.colors.gray.gray50,
  position: "relative",
});

export const ellipsis = recipe({
  base: {
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  variants: {
    lineSize: {
      line1: {
        display: "block",
        whiteSpace: "nowrap",
        webkitLineClamp: "none",
        webkitBoxOrient: "none",
        lineHeight: "normal",
      },
      line2: {
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": "2",
      },
      line3: {
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": "3",
      },
      line4: {
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": "4",
      },
      line5: {
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": "5",
      },
    },
    wordBreak: {
      keep: {
        wordBreak: "keep-all",
      },
    },
    whiteSpace: {
      pre: {
        whiteSpace: "pre-line",
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
  },
});
export const pointColor = style({ color: themeVars.colors.red.red });

export const defaultWidth = style({
  minWidth: "335px",
  width: "80%",
  marginTop: 0,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "60px",
});

export const inlineBlockSpan = style({
  display: "inline-block",
  marginLeft: "8px",
});

export const sanitizedHTML = style({});

globalStyle(`${sanitizedHTML} *`, {
  textAlign: "unset",
});

globalStyle(`${sanitizedHTML} img`, {
  width: "100%",
  maxWidth: "600px",
  height: "auto",
  display: "block",
  margin: "0 auto",
});

globalStyle(`${sanitizedHTML} h1`, {
  fontSize: themeVars.fontSize["title-lg"],
  fontWeight: themeVars.fontWeight.bold,
});

globalStyle(`${sanitizedHTML} h2`, {
  fontSize: themeVars.fontSize["title-md"],
});

globalStyle(`${sanitizedHTML} b, strong`, {
  fontWeight: themeVars.fontWeight.bold,
});

globalStyle(`${sanitizedHTML} p`, {
  margin: "10px 0",
});

export const commonWrapper = recipe({
  base: {
    display: "flex",
  },
  variants: {
    gap: {
      2: {
        gap: "2px",
      },
      4: {
        gap: "4px",
      },
      6: {
        gap: "6px",
      },
      8: {
        gap: "8px",
      },
      10: {
        gap: "10px",
      },
      12: {
        gap: "12px",
      },
      16: {
        gap: "16px",
      },
      18: {
        gap: "18px",
      },
      20: {
        gap: "20px",
      },
      24: {
        gap: "24px",
      },
      26: {
        gap: "26px",
      },
      28: {
        gap: "28px",
      },
      32: {
        gap: "32px",
      },
      40: {
        gap: "40px",
      },
      "32/8": {
        gap: "32px 8px",
      },
    },
    padding: {
      8: {
        padding: "8px",
      },
      12: {
        padding: "12px",
      },
      16: {
        padding: "16px",
      },
      20: {
        padding: "20px",
      },
      32: {
        padding: "32px",
      },
      40: {
        padding: "40px",
      },
      "20/16": {
        padding: "20px 16px",
      },
      "32/20": {
        padding: "32px 20px",
      },
    },
    paddingBottom: {
      8: {
        paddingBottom: "8px",
      },
      12: {
        paddingBottom: "12px",
      },
      16: {
        paddingBottom: "16px",
      },
      20: {
        paddingBottom: "20px",
      },
      30: {
        paddingBottom: "30px",
      },
      32: {
        paddingBottom: "30px",
      },
      40: {
        paddingBottom: "40px",
      },
      60: {
        paddingBottom: "60px",
      },
      85: {
        paddingBottom: "85px",
      },
      128: {
        paddingBottom: "128px",
      },
    },
    paddingTop: {
      4: {
        paddingTop: "4px",
      },
      6: {
        paddingTop: "6px",
      },
      8: {
        paddingTop: "8px",
      },
      12: {
        paddingTop: "12px",
      },
      16: {
        paddingTop: "16px",
      },
      18: {
        paddingTop: "18px",
      },
      20: {
        paddingTop: "20px",
      },
      24: {
        paddingTop: "24px",
      },
      32: {
        paddingTop: "32px",
      },
      40: {
        paddingTop: "40px",
      },
      60: {
        paddingTop: "60px",
      },
      114: {
        paddingTop: "114px",
      },
    },
    paddingX: {
      8: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
      12: {
        paddingLeft: "12px",
        paddingRight: "12px",
      },
      16: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
      20: {
        paddingLeft: "20px",
        paddingRight: "20px",
      },
      32: {
        paddingLeft: "32px",
        paddingRight: "32px",
      },
      40: {
        paddingLeft: "40px",
        paddingRight: "40px",
      },
    },
    paddingY: {
      4: {
        paddingTop: "4px",
        paddingBottom: "4px",
      },
      8: {
        paddingTop: "8px",
        paddingBottom: "8px",
      },
      12: {
        paddingTop: "12px",
        paddingBottom: "12px",
      },
      16: {
        paddingTop: "16px",
        paddingBottom: "16px",
      },
      20: {
        paddingTop: "20px",
        paddingBottom: "20px",
      },
      24: {
        paddingTop: "24px",
        paddingBottom: "24px",
      },
      28: {
        paddingTop: "28px",
        paddingBottom: "28px",
      },
      32: {
        paddingTop: "32px",
        paddingBottom: "32px",
      },
      40: {
        paddingTop: "40px",
        paddingBottom: "40px",
      },
      60: {
        paddingTop: "60px",
        paddingBottom: "60px",
      },
      80: {
        paddingTop: "80px",
        paddingBottom: "80px",
      },
    },
    marginBottom: {
      85: {
        marginBottom: "85px",
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
      around: {
        justifyContent: "space-around",
      },
      between: {
        justifyContent: "space-between",
      },
      end: {
        justifyContent: "flex-end",
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
      end: {
        alignItems: "flex-end",
      },
    },
    height: {
      full: {
        height: "100vh",
      },
      "100%": {
        height: "100%",
      },
      fullWithHeader: {
        height: "calc(100vh - 52px)",
      },
    },
    minHeight: {
      fullWithHeader: {
        minHeight: "calc(100vh - 52px)",
      },
    },
    backgroundColors: {
      transparent: {
        backgroundColor: "transparent",
      },
      gray0: {
        backgroundColor: themeVars.colors.gray.gray0,
      },
      gray50: {
        backgroundColor: themeVars.colors.gray.gray50,
      },
      gray100: {
        backgroundColor: themeVars.colors.gray.gray100,
      },
    },
    textAlign: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
    },
    width: {
      full: {
        width: "100%",
      },
      auto: {
        width: "auto",
      },
    },
    maxWidth: {
      600: {
        maxWidth: "600px",
      },
    },
    borderRadius: {
      0: {
        borderRadius: 0,
      },
      8: {
        borderRadius: "8px",
      },
      12: {
        borderRadius: "12px",
      },
      16: {
        borderRadius: "16px",
      },
    },
    shadow: {
      none: {},
      light: {
        boxShadow: themeVars.shadow.light,
      },
      normal: {
        boxShadow: themeVars.shadow.normal,
      },
      strong: {
        boxShadow: themeVars.shadow.strong,
      },
    },
    wrap: {
      wrap: {
        flexWrap: "wrap",
      },
      unset: {
        flexWrap: "unset",
      },
    },
    border: {
      none: {},
      gray100: {
        border: `1px solid ${themeVars.colors.gray.gray100}`,
      },
      gray200: {
        border: `1px solid ${themeVars.colors.gray.gray200}`,
      },
      gray300: {
        border: `1px solid ${themeVars.colors.gray.gray300}`,
      },
      red: {
        border: `1px solid ${themeVars.colors.red.red}`,
      },
      blue500: {
        border: `1px solid ${themeVars.colors.blue.blue500}`,
      },
    },
  },
  defaultVariants: {
    direction: "row",
    justify: "center",
    align: "center",
    width: "full",
  },
});

export const imageWrapper = recipe({
  base: {
    width: "100%",
  },
  variants: {
    objectFit: {
      cover: {
        objectFit: "cover",
      },
      contain: {
        objectFit: "contain",
      },
    },
    objectPosition: {
      bottom: {
        objectPosition: "bottom",
      },
    },
    borderRadius: {
      6: {
        borderRadius: 6,
      },
      8: {
        borderRadius: 8,
      },
      16: {
        borderRadius: 16,
      },
      "50%": {
        borderRadius: "50%",
      },
    },
    width: {
      48: {
        width: 48,
        height: 48,
      },
      72: {
        width: 72,
        height: 72,
      },
      76: {
        width: 76,
        height: 76,
      },
      80: {
        width: 80,
        height: 80,
      },
      96: {
        width: 96,
        height: 96,
      },
      100: {
        width: 100,
        height: 100,
      },
      107: {
        width: 107,
        height: 107,
      },
    },
    height: {
      "100%": {
        height: "100%",
      },
      auto: {
        height: "auto",
      },
    },
    hoverScale: {
      true: {
        transition: "transform 0.3s ease",
        backfaceVisibility: "hidden",
        transform: "translate3d(0, 0, 0)",
        selectors: {
          "&:hover": {
            transform: "scale(1.1) translate3d(0, 0, 0)",
            willChange: "transform",
          },
        },
      },
    },
  },
  defaultVariants: {
    hoverScale: false,
  },
});

export const marginStyles = recipe({
  base: {},
  variants: {
    top: {
      4: { marginTop: "4px" },
      6: { marginTop: "6px" },
      8: { marginTop: "8px" },
      12: { marginTop: "12px" },
    },
    bottom: {
      4: { marginBottom: "4px" },
      6: { marginBottom: "6px" },
      8: { marginBottom: "8px" },
      60: { marginBottom: "60px" },
    },
  },
});

export const paddingStyles = recipe({
  base: {},
  variants: {
    all: {
      20: {
        padding: "20px",
      },
    },
    x: {
      4: { paddingLeft: "4px", paddingRight: "4px" },
      12: { paddingLeft: "12px", paddingRight: "12px" },
      16: { paddingLeft: "16px", paddingRight: "16px" },
      20: { paddingLeft: "20px", paddingRight: "20px" },
    },
    y: {
      4: { paddingTop: "4px", paddingBottom: "4px" },
      12: { paddingTop: "12px", paddingBottom: "12px" },
      16: { paddingTop: "16px", paddingBottom: "16px" },
      20: { paddingTop: "20px", paddingBottom: "20px" },
    },
    top: {
      4: { paddingTop: "4px" },
      6: { paddingTop: "6px" },
      8: { paddingTop: "8px" },
      12: { paddingTop: "12px" },
    },
    bottom: {
      4: { paddingBottom: "4px" },
      6: { paddingBottom: "6px" },
      8: { paddingBottom: "8px" },
      12: { paddingBottom: "12px" },
      85: { paddingBottom: "85px" },
    },
  },
});
