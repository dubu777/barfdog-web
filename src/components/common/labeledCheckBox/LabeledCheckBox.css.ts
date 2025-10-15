import { recipe } from "@vanilla-extract/recipes";

export const labelCheckedBoxContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "8px",
    cursor: "pointer",
    width: "100%",
  },
  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      col: {
        flexDirection: "column",
      },
    },
  },
});
