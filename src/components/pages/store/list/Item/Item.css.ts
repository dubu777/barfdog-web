import { style } from "@vanilla-extract/css";

export const storeItem = style({
  "@media": {
    "screen and (min-width: 500px)": {
      flexBasis: "calc((100% - 16px) / 3)",
    },
    "screen and (max-width: 499px)": {
      flexBasis: "calc((100% - 8px) / 2)",
    },
  },
});

export const itemImageBox = style({
  width: "100%",
  height: "auto",
  aspectRatio: "1 / 1",
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
});

export const itemTags = style({
  display: "flex",
  gap: "3px",
  position: "absolute",
  top: "4px",
  left: "4px",
  zIndex: "50 !important",
});
