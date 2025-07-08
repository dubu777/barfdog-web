import { recipe } from "@vanilla-extract/recipes";

export const labeledRadioButtonContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",

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
  },
  defaultVariants: {
    fullWidth: true,
  },
});
