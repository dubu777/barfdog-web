import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const reviewItemTypeFilter = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  gap: '4px',
  padding: '20px 12px 4px 20px',
  background: themeVars.colors.gray.gray0,
})

export const reviewTab = style({
  padding: '20px',
  background: themeVars.colors.gray.gray0,
})

export const reviewListContainer = recipe({
  base: {
    marginTop: '8px',
  },
  variants: {
    isEmpty: {
      true: {
        padding: '33px 20px 0',
      }
    }
  }
})

export const reviewList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
})

export const reviewItem = style({
  // borderBottom: `1px solid ${themeVars.colors.gray.gray300}`,
})

export const infiniteTrigger = style({
  height: '72px',
  background: themeVars.colors.gray.gray50,
});