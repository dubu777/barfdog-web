import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const labelValueItemContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "stretch",
  },
  variants: {
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
    },
    gap: {
      6: { gap: "6px" },
      12: { gap: "12px" },
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
      60: { width: "60px" },
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
  overflowWrap: "anywhere",
  wordBreak: "break-word",
});
