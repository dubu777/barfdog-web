import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const dogInfoContainer = recipe({
  base: {
    backgroundColor: themeVars.colors.gray.gray50,
    padding: '20px 0 14px',
  },
  variants: {
    emptyState: {
      true: {
        padding: '20px',
      }
    }
  }
})

export const dogList = style({
  height: '100%',
  paddingBottom: '30px !important',
})

export const itemSlider = style({
  width: 'calc(100% - 40px) !important',
});