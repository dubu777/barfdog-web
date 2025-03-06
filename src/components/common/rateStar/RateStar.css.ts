import { style } from "@vanilla-extract/css";
import {recipe} from "@vanilla-extract/recipes";

export const rateStarBoxAlignStyles = {
  center: style({
    textAlign: 'center',
  }),
  left: style({
    textAlign: 'left',
  }),
  right: style({
    textAlign: 'right',
  }),
}

export const rateStarBoxInlineBlockStyles = style({
  display: 'inline-block',
})

export const rateStarStyles = recipe({
  base: {
    margin: '0 1px',
  },
  variants: {
    isEditable: {
      true: {
        cursor: 'pointer',
      }
    }
  }
})
