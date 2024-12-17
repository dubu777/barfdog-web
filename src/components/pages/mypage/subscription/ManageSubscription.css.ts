import { style } from "@vanilla-extract/css";
import { defaultWidth } from "@/styles/common.css";

export const subscriptionContainer = style([defaultWidth, {}]);

export const subscriptionTitle = style({
  marginBottom: '35px',
})

export const subscriptionList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
})