import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const blogArticleListContainer = style({
  background: themeVars.backgroundColors.pinkFa,
  padding: '40px 0',
})

export const articleList = style({
  marginTop: '20px',
  display: 'flex',
  justifyContent: "space-between",
})

export const article = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'flex-start',
})

export const articleImage = style({
  objectFit: 'cover',
})