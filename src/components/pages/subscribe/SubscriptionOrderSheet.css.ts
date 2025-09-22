import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const recipeTailChipWrapper = style({
  position: "fixed",
  bottom: "100px",
  left: "50%",
  transform: "translateX(-50%)",
});

export const subscribePageContainer = recipe({
  base: {},
  variants: {
    withPadding: {
      true: {
        paddingBottom: "85px",
      },
    },
  },
});
