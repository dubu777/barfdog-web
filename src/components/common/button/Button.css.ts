import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const baseStyle = style({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
  border: "none",
  background: "transparent",
});

export const contentStyle = style({
  display: "inline-flex",
  alignItems: "center",
  columnGap: "6px",
});

export const labelStyle = style({
  fontFamily: "var(--font-pretendard)",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  lineHeight: "normal",
  whiteSpace: "nowrap",
});

export const boxShadowStyle = style({
  boxShadow: themeVars.shadow.light,
});

// sizes
const size_sm = style({
  padding: "6px 16px",
  height: "36px",
  borderRadius: "8px",
  fontWeight: themeVars.typography.headline.headline4.fontWeight,
  fontSize: themeVars.typography.headline.headline4.fontSize,
  lineHeight: themeVars.typography.headline.headline4.lineHeight,
  letterSpacing: themeVars.typography.headline.headline4.letterSpacing,
});

const size_md = style({
  padding: "10px 24px",
  height: "44px",
  borderRadius: "8px",
  fontWeight: themeVars.typography.headline.headline3.fontWeight,
  fontSize: themeVars.typography.headline.headline3.fontSize,
  lineHeight: themeVars.typography.headline.headline3.lineHeight,
  letterSpacing: themeVars.typography.headline.headline3.letterSpacing,
});

const size_lg = style({
  padding: "12px 28px",
  height: "48px",
  borderRadius: "8px",
  fontWeight: themeVars.typography.headline.headline3.fontWeight,
  fontSize: themeVars.typography.headline.headline3.fontSize,
  lineHeight: themeVars.typography.headline.headline3.lineHeight,
  letterSpacing: themeVars.typography.headline.headline3.letterSpacing,
});

const size_input = style({
  padding: "12px 30px",
  width: "84px",
  height: "48px",
  borderRadius: "8px",
  fontWeight: themeVars.typography.headline.headline3.fontWeight,
  fontSize: themeVars.typography.headline.headline3.fontSize,
  lineHeight: themeVars.typography.headline.headline3.lineHeight,
  letterSpacing: themeVars.typography.headline.headline3.letterSpacing,
});

export const buttonClass = recipe({
  base: [baseStyle],
  variants: {
    variant: {
      solid: {},
      outline: {},
      text: {},
    },
    intent: {
      primary: {},
      secondary: {},
      assistive: {},
    },
    size: {
      sm: size_sm,
      md: size_md,
      lg: size_lg,
      inputButton: size_input,
    },
    fullWidth: {
      true: { width: "100%" },
      false: {},
    },
    shadow: {
      true: boxShadowStyle,
      false: {},
    },
    disabled: {
      true: { cursor: "not-allowed" },
      false: {},
    },
    fill: {
      true: {},
      false: {},
    },
  },
  // variant x intent 조합
  compoundVariants: [
    // SOLID
    {
      variants: { variant: "solid", intent: "primary" },
      style: {
        backgroundColor: themeVars.colors.red.red,
        color: themeVars.colors.gray.gray0,
      },
    },
    {
      variants: { variant: "solid", intent: "secondary" },
      style: {
        backgroundColor: themeVars.colors.gray.gray800,
        color: themeVars.colors.gray.gray0,
      },
    },

    // ===== OUTLINE (fill=true / fill=false 분기) =====
    // primary
    {
      variants: { variant: "outline", intent: "primary", fill: true },
      style: {
        backgroundColor: themeVars.colors.gray.gray0,
        color: themeVars.colors.red.red,
        border: `1px solid ${themeVars.colors.red.red}`,
      },
    },
    {
      variants: { variant: "outline", intent: "primary", fill: false },
      style: {
        backgroundColor: "transparent",
        color: themeVars.colors.red.red,
        border: `1px solid ${themeVars.colors.red.red}`,
      },
    },
    // secondary
    {
      variants: { variant: "outline", intent: "secondary", fill: true },
      style: {
        backgroundColor: themeVars.colors.gray.gray0,
        color: themeVars.colors.red.red,
        border: `1px solid ${themeVars.colors.gray.gray300}`,
      },
    },
    {
      variants: { variant: "outline", intent: "secondary", fill: false },
      style: {
        backgroundColor: "transparent",
        color: themeVars.colors.red.red,
        border: `1px solid ${themeVars.colors.gray.gray300}`,
      },
    },
    // assistive
    {
      variants: { variant: "outline", intent: "assistive", fill: true },
      style: {
        backgroundColor: themeVars.colors.gray.gray0,
        color: themeVars.colors.gray.gray900,
        border: `1px solid ${themeVars.colors.gray.gray300}`,
      },
    },
    {
      variants: { variant: "outline", intent: "assistive", fill: false },
      style: {
        backgroundColor: "transparent",
        color: themeVars.colors.gray.gray900,
        border: `1px solid ${themeVars.colors.gray.gray300}`,
      },
    },

    // TEXT
    {
      variants: { variant: "text", intent: "primary" },
      style: {
        backgroundColor: "transparent",
        color: themeVars.colors.red.red,
      },
    },
    {
      variants: { variant: "text", intent: "secondary" },
      style: {
        backgroundColor: "transparent",
        color: themeVars.colors.gray.gray600,
      },
    },
    {
      variants: { variant: "text", intent: "assistive" },
      style: {
        backgroundColor: "transparent",
        color: themeVars.colors.gray.gray0,
      },
    },

    // DISABLED
    {
      variants: { variant: "solid", disabled: true },
      style: {
        backgroundColor: themeVars.colors.gray.gray100,
        color: themeVars.colors.gray.gray300,
      },
    },
    {
      variants: { variant: "outline", disabled: true },
      style: {
        color: themeVars.colors.gray.gray300,
        borderColor: themeVars.colors.gray.gray300,
      },
    },
    {
      variants: { variant: "text", disabled: true },
      style: {
        color: themeVars.colors.gray.gray300,
      },
    },
  ],
  defaultVariants: {
    variant: "solid",
    intent: "primary",
    size: "md",
    fullWidth: false,
    shadow: false,
    disabled: false,
    fill: true,
  },
});
