import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const itemHeroContainer = style({
  padding: '20px 0',
})

export const itemPrice = style({
  display: 'flex',
  alignItems: 'flex-end',
  marginTop: '20px',
})

export const itemSalePriceBox = style({
  marginLeft: '20px',
  display: 'flex',
  gap: '5px',
  alignItems: 'flex-end',
})

export const itemSalePrice = style({
  textDecoration: 'line-through',
})

export const itemInfoBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginTop: '20px',
  paddingTop: '20px',
  borderTop: `1px solid ${themeVars.borderColors.greyDD}`,
})

export const itemInfo = style({
  display: 'flex',
})

export const infoLabel = style({
  width: '20%'
})

export const infoValue = style({
  width: '80%'
})

export const description = style({
  whiteSpace: 'normal !important'
})