import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const itemListHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px'
})


export const reviewList = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: '50px',
  padding: '0 20px',
})

export const reviewItem = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    padding: '16px 0 !important',
  },
  variants: {
    isHeader: {
      true: {
        padding: '20px 0',
        borderBottom: `2px solid ${themeVars.borderColors.greyBB}`
      }
    }
  }
})

globalStyle(`${reviewItem({})} p:nth-child(1)`, { width: '10%' })
globalStyle(`${reviewItem({})} p:nth-child(2)`, { width: '10%' })
globalStyle(`${reviewItem({})} p:nth-child(3)`, { width: '20%' })
globalStyle(`${reviewItem({})} p:nth-child(4)`, { width: '35%' })
globalStyle(`${reviewItem({})} p:nth-child(5)`, { width: '10%' })
globalStyle(`${reviewItem({})} p:nth-child(6)`, { width: '15%' })