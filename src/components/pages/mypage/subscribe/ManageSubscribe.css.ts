import { style } from "@vanilla-extract/css";
import { defaultWidth } from "@/styles/common.css";

export const subscribeContainer = style([defaultWidth, {}]);

export const subscribeTitle = style({
  marginBottom: '35px',
})

export const subscribeList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
})