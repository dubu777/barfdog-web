import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const surveyButtonListContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
})



export const surveyButtonListWrapper = recipe({
  base: {
    width: '100%',
  },
  variants: {
    type: {
      row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '11px',
      },
      col: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '19px',
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        justifyContent: 'center',
        columnGap: '19px',
        rowGap: '19px',
      }
    },
  },
  defaultVariants: {
    type: 'col',
  }
});