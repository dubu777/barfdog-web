import { recipe } from "@vanilla-extract/recipes";

export const labeledRadioButtonContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",

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
