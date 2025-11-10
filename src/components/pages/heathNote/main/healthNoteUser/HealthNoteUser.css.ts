import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const menuCategoryBox = style({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
});

export const menuCategory = recipe({
  base: {
    display: "flex",
    cursor: "pointer",
  },
  variants: {
    isFullCheck: {
      true: {
        gridColumn: "span 2",
      },
    },
  },
});

export const menuCategoryCard = recipe({
  base: {},
  variants: {
    fullWidth: {
      true: {},
      false: {
        gap: "32px",
      },
    },
  },
});

export const menuImage = style({
  marginLeft: "auto",
});
