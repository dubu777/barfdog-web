import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const postNavigationContainer = style({
  paddingBottom: '20px',
})

export const postNavigationHeader = style({
  padding: '20px 20px 12px',
  backgroundColor: themeVars.colors.gray.gray0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const postNavigationGoBack = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})


export const postNavigationButton = style({
  width: '100%',
  padding: '12px 20px',
  backgroundColor: themeVars.colors.gray.gray0,
})

export const currentItem = style({
  backgroundColor: themeVars.colors.gray.gray100,
})