import { recipe } from "@vanilla-extract/recipes";

export const notification = recipe({
  base: {},
  variants: {
    isMobileDevice: {
      true: {
        marginBottom: 20,
      },
      false: {
        marginBottom: 105,
      }
    }
  },
  defaultVariants: {
    isMobileDevice: false,
  },
});