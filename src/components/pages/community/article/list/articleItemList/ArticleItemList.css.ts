import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const articleListContainer = style({
  backgroundColor: themeVars.colors.gray.gray0,
});

export const categoryFilter = style({
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
});

export const articleList = recipe({
  base: {
    borderTop: `1px solid ${themeVars.colors.gray.gray100}`,
  },
  variants: {
    isEmpty: {
      true: {
        padding: "50px 0 150px",
      },
    },
  },
});

export const articleItem = recipe({
  base: {
    width: "100%",
  },
  variants: {
    mode: {
      gallery: {
        position: "relative",
        overflow: "hidden",
      },
      board: {
        display: "flex",
      },
    },
  },
});

export const articleItemTitle = style({
  display: "flex",
  gap: "4px",
});

export const articleItemCategory = style({
  minWidth: "34px",
  whiteSpace: "nowrap",
});

export const articleContents = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "16px",
    padding: "10px",
  },
  variants: {
    mode: {
      gallery: {
        width: "100%",

      },
      board: {
        width: "calc(100% - 96px)",

      },
    },
  },
});

export const articleGallery = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", // 무조건 2개 컬럼으로 고정
  gridAutoRows: "10px",
  gap: "4px",
});
