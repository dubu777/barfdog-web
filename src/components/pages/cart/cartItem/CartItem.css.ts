import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const cartItemBox = style({
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const deleteButton = style({
  position: 'absolute',
  right: 0,
  top: 0,
});

export const cartItemImage = recipe({
  base: {
    borderRadius: "8px",
    border: "1px solid #eee",
  },
  variants: {
    isSoldOut: {
      true: {
        opacity: .45,
      }
    }
  }
});

export const cartItemOptionBox = recipe({
  base: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  variants: {
    isOptionSoldOut: {
      true: {
        opacity: .45,
      }
    }
  }
});