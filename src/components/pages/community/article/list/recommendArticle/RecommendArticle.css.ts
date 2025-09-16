import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const recommendArticleContainer = style({
  padding: '0 20px 20px',
})

export const recommendArticleList = style({
  borderRadius: '8px',
  overflow: 'hidden',
})

export const recommendArticleTitle = style({
  backgroundColor: themeVars.colors.red.red,
  padding: '6px 12px',
})

export const recommendArticle = style({
  position: 'relative',
  width: '100%',
  // height: '392px',
  aspectRatio: '7 / 4'
})

export const recommendArticleContents = style({
  height: 'auto',
  display: "flex",
  flexDirection: "column",
})
