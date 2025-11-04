import { recipe } from "@vanilla-extract/recipes";

export const labelCheckedBoxContainer = recipe({
  base: {
    display: "flex",
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
    align: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
    },
    justify: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
    },
  },
});
