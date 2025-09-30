import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const notification = recipe({
  base: {
    border: `1px solid ${themeVars.colors.gray.gray300}`,
    marginBottom: 20,
  },
  variants: {
    isMobileDevice: {
      false: {
        marginBottom: 105,
      }
    }
  }
});