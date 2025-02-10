import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";
import {recipe} from "@vanilla-extract/recipes";

export const noticeContainer = style({
  marginTop: '64px',
  paddingTop: '30px',
  marginBottom: '60px',
})

export const noticeList = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: '50px',
  padding: '0 20px',
})

export const noticeItem = recipe({
  base: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'left',
    padding: '16px 0 ',
    borderBottom: `1px solid ${themeVars.borderColors.greyBB}`
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

export const noticeId = style({
  width: '10%'
})

export const noticeCreatedDate = style({
  width: '25%',
  marginLeft: 'auto',
  textAlign: 'center'
})

export const noticeTitle = style({
  width: '65%',
  marginLeft: '40px',
})