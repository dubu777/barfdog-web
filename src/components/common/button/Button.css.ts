import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

// 버튼 크기
export const buttonSizes = {
  sm: style({
    padding: "4px 6px",
    borderRadius: "8px",
    fontWeight: themeVars.typography.headline.headline4.fontWeight,
    fontSize: themeVars.typography.headline.headline4.fontSize,
    lineHeight: themeVars.typography.headline.headline4.lineHeight,
    letterSpacing: themeVars.typography.headline.headline4.letterSpacing,
  }),
  md: style({
    padding: "10px 24px",
    borderRadius: "8px",
    fontWeight: themeVars.typography.headline.headline3.fontWeight,
    fontSize: themeVars.typography.headline.headline3.fontSize,
    lineHeight: themeVars.typography.headline.headline3.lineHeight,
    letterSpacing: themeVars.typography.headline.headline3.letterSpacing,
  }),
  lg: style({
    padding: "12px 28px",
    borderRadius: "8px",
    fontWeight: themeVars.typography.headline.headline3.fontWeight,
    fontSize: themeVars.typography.headline.headline3.fontSize,
    lineHeight: themeVars.typography.headline.headline3.lineHeight,
    letterSpacing: themeVars.typography.headline.headline3.letterSpacing,
  }),
};

export const iconContainer = style({
  display: "inline-flex",
  alignItems: "center",
  columnGap: "8px",
});

// 버튼 상태
export const buttonVariants = {
  solid: {
    primary: style({
      backgroundColor: themeVars.colors.red.red,
      color: themeVars.colors.gray.gray0,
      border: "none",
      cursor: "pointer",
    }),
  },
  outline: {
    primary: style({
      backgroundColor: "transparent",
      border: `1px solid ${themeVars.colors.red.red}`,
      color: themeVars.colors.red.red,
      cursor: "pointer",
    }),
    secondary: style({
      backgroundColor: "transparent",
      border: `1px solid ${themeVars.colors.gray.gray300}`,
      color: themeVars.colors.red.red,
      cursor: "pointer",
    }),
    assistive: style({
      backgroundColor: "transparent",
      border: `1px solid ${themeVars.colors.gray.gray300}`,
      color: themeVars.colors.gray.gray900,
      cursor: "pointer",
    }),
  },
  text: {
    primary: style({
      backgroundColor: "transparent",
      color: themeVars.colors.red.red,
      cursor: "pointer",
      border: "none",
    }),
    assistive: style({
      backgroundColor: "transparent",
      color: themeVars.colors.gray.gray500,
      cursor: "pointer",
      border: "none",
    }),
  },
};

// 비활성화 상태
export const disabledVariants = {
  solid: {
    primary: style({
      backgroundColor: themeVars.colors.gray.gray300,
      color: themeVars.colors.gray.gray0,
      cursor: "not-allowed",
    }),
  },
  outline: {
    primary: style({
      borderColor: themeVars.colors.gray.gray300,
      color: themeVars.colors.gray.gray300,
      cursor: "not-allowed",
    }),
    secondary: style({
      borderColor: themeVars.colors.gray.gray300,
      color: themeVars.colors.gray.gray300,
      cursor: "not-allowed",
    }),
    assistive: style({
      borderColor: themeVars.colors.gray.gray300,
      color: themeVars.colors.gray.gray300,
      cursor: "not-allowed",
    }),
  },
  text: {
    primary: style({
      borderColor: themeVars.colors.gray.gray300,
      cursor: "not-allowed",
    }),
    assistive: style({
      borderColor: themeVars.colors.gray.gray300,
      cursor: "not-allowed",
    }),
  },
};
