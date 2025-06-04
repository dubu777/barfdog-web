import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const articleListContainer = style({
  backgroundColor: themeVars.colors.gray.gray0,
})

export const categoryFilter = style({
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
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
  base: {
  },
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

export const articleItemTitle = style({
  display: "flex",
  gap: '4px',
});

export const articleItemCategory = style({
  minWidth: '34px',
});

export const articleContents = style({
  // width: '100%',
  display: "flex",
  flexDirection: "column",
  justifyContent: 'space-between',
  gap: '16px',
  padding: '10px',
});

export const articleGallery = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gridAutoRows: "10px",
  gap: "4px",
});
