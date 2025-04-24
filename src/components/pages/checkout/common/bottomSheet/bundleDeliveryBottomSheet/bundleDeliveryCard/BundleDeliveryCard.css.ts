import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const bundleBottomSheetCardBox = recipe({
  base: {
    padding: "12px",
    backgroundColor: themeVars.colors.red.pinkWhite,
    borderRadius: "8px",
    width: "100%",
  },
  variants: {
    isSelected: {
      true: {
        border: `1px solid ${themeVars.colors.red.lightRed}`
      },
      false: {
        border: `1px solid ${themeVars.colors.gray.gray200}`
      },
    }
  },
  defaultVariants: {
    isSelected: false,
  }

})

export const bundleDeliveryCardTitleWrapper = style({
  display: "flex",
  alignItems: "center",
  paddingTop: "2px",
  gap: '8px',
})