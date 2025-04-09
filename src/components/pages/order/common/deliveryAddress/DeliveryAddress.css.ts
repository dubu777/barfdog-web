import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const colStartWrapper = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: "100%",
  },
  variants: {
    gap: {
      0: {
        gap: "0",
      },
      2: {
        gap: "2px"
      },
      4: {
        gap: "4px"
      },
      8: {
        gap: "8px"
      },
      16: {
        gap: "16px"
      },
    }
  },
})


export const rowStartWrapper = recipe({
  base: {
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: "100%",
  },
  variants: {
    gap: {
      2: {
        gap: "2px"
      },
      4: {
        gap: "4px"
      },
      8:{
        gap: "8px",
      }
    }
  },
})
export const tempWrapper = style({
  display: "flex",
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '81px'
})