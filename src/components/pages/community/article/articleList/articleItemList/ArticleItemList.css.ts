import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const articleListContainer = style({
  background: themeVars.colors.gray.gray0,
})

export const categoryFilter = style({
  padding: '50px 0',
  display: 'flex',
  justifyContent: 'center',
  gap: '50px',
})

export const categoryButton = recipe({
  base: {
    cursor: 'pointer',
    color: themeVars.fontColors.grey97,
  },
  variants: {
    active: {
      true: {
        color: themeVars.colors.red.red,
        fontWeight: themeVars.fontWeight.bold,
      }
    }
  }
})

export const articleList = recipe({
  base: {
    borderTop: `1px solid ${themeVars.borderColors.greyED}`
  },
  variants: {
    isEmpty: {
      true: {
        padding: '50px 0 150px',
      }
    }
  }
})
export const articleItem = recipe({
  base: {},
  variants :{
    mode: {
      gallery: {
        position: "relative",
        overflow: "hidden",
      },
      board: {
        display: 'flex',
      }
    }
  }
});

export const articleContents = style({
  display: "flex",
  flexDirection: "column",
  gap: '16px',
  padding: '20px 10px',
});

export const articleGallery = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gridAutoRows: "10px",
  gap: "4px",
});
