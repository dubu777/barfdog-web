import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

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
  aspectRatio: '7 / 4'
})
