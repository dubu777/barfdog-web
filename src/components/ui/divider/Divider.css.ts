import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const divider = recipe({
  variants: {
    direction: {
      horizontal: {
        width: "100%",
      },
      vertical: {
        marginTop: "auto",
        marginBottom: "auto",
        borderLeft: `1px solid ${themeVars.colors.gray.gray50}`,
      },
    },
    height: {
      1: {},
      2: {},
      4: {},
      6: {},
      8: {},
      12: {},
      40: {},
      50: {},
      60: {},
      70: {},
    },
  },
  compoundVariants: [
    // Horizontal border thickness variants
    {
      variants: { direction: "horizontal", height: 1 },
      style: { borderBottom: `1px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "horizontal", height: 2 },
      style: { borderBottom: `2px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "horizontal", height: 4 },
      style: { borderBottom: `4px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "horizontal", height: 6 },
      style: { borderBottom: `6px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "horizontal", height: 8 },
      style: { borderBottom: `8px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "horizontal", height: 12 },
      style: { borderBottom: `12px solid ${themeVars.colors.gray.gray50}` },
    },
    // Vertical CSS height percentage variants
    {
      variants: { direction: "vertical", height: 40 },
      style: { height: "40%" },
    },
    {
      variants: { direction: "vertical", height: 50 },
      style: { height: "50%" },
    },
    {
      variants: { direction: "vertical", height: 60 },
      style: { height: "60%" },
    },
    {
      variants: { direction: "vertical", height: 70 },
      style: { height: "70%" },
    },
  ],
  defaultVariants: {
    direction: "horizontal",
    height: 8,
  },
});
