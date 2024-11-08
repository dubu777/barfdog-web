import {style} from "@vanilla-extract/css";
import {defaultWidth} from "@/styles/common.css";

export const couponContainer = style([defaultWidth, {
  // border: '1px solid red',
}])

export const couponListBox = style({
  marginTop: '52px',
})

export const couponList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  marginTop: '20px',
})
