import { recipe } from "@vanilla-extract/recipes";

export const labeledRadioButtonContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "8px",
    cursor: "pointer",
  },
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {},
    },
    align: {
      center: {
        alignItems: "center",
      },
      start: {
        alignItems: "start",
      },
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
