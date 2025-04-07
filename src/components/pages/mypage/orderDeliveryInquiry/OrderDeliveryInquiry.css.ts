import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const orderStatusFilterTabBar = style({
  background: themeVars.colors.gray.gray0,
  marginTop: '2px',
});

export const orderListContainer = style({
  padding: '20px',
});

export const orderList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
});

export const orderListItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const orderItemsBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});