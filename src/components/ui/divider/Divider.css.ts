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
      },
    },
    thickness: {
      1: {},
      2: {},
      4: {},
      6: {},
      8: {},
      12: {},
    },
    height: {
      40: { height: "40%" },
      50: { height: "50%" },
      60: { height: "60%" },
      70: { height: "70%" },
    },
  },
  compoundVariants: [
    // Horizontal thickness variants
    {
      variants: { direction: "horizontal", thickness: 1 },
      style: { borderBottom: `1px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "horizontal", thickness: 2 },
      style: { borderBottom: `2px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "horizontal", thickness: 4 },
      style: { borderBottom: `4px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "horizontal", thickness: 6 },
      style: { borderBottom: `6px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "horizontal", thickness: 8 },
      style: { borderBottom: `8px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "horizontal", thickness: 12 },
      style: { borderBottom: `12px solid ${themeVars.colors.gray.gray50}` },
    },
    // Vertical thickness variants
    {
      variants: { direction: "vertical", thickness: 1 },
      style: { borderLeft: `1px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "vertical", thickness: 2 },
      style: { borderLeft: `2px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "vertical", thickness: 4 },
      style: { borderLeft: `4px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "vertical", thickness: 6 },
      style: { borderLeft: `6px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "vertical", thickness: 8 },
      style: { borderLeft: `8px solid ${themeVars.colors.gray.gray50}` },
    },
    {
      variants: { direction: "vertical", thickness: 12 },
      style: { borderLeft: `12px solid ${themeVars.colors.gray.gray50}` },
    },
  ],
  defaultVariants: {
    direction: "horizontal",
    thickness: 8,
    height: 40,
  },
});
