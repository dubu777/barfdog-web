import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const searchAddressContainer = recipe({
  base: {
  },
  variants: {
    flexDirection: {
      column: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }
    }
  }
});


export const searchAddressInput = style({
  marginBottom: '13px',
  flexDirection: 'column'
});
