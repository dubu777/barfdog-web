import { recipe } from "@vanilla-extract/recipes";

export const radioButtonListContainer = recipe({
  base: {
  },
  variants: {
    type: {
      row: {
        display: 'flex',
        flexDirection: 'row',
        gap: '11px',
      },
      col: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '19px',
        padding: '0 3.75rem',
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
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