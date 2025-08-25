import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const labelValueItemContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "stretch",
    gap: "6px",
  },
  variants: {
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
    },
  },
  defaultVariants: { align: "center" },
});

export const labelText = recipe({
  base: {
    flexShrink: 0,
  },
  variants: {
    width: {
      80: { width: "80px" },
      100: { width: "100px" },
      120: { width: "120px" },
    },
  },
  defaultVariants: {
    width: 100,
  },
});

export const valueText = style({
  flex: 1,
  textAlign: "right",
});
