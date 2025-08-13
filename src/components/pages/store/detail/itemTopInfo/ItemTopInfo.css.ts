import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const itemInfoBox = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  gap: '12px',
  backgroundColor: themeVars.colors.gray.gray0,
});

export const itemDefaultInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const itemTagList = style({
  display: 'flex',
  gap: '4px',
});

export const itemTitle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const itemStar = style({
  display: 'flex',
  gap: '2px',
  alignItems: 'center',
});

export const itemDiscountPrice = style({
  display: "flex",
  gap: '6px',
  alignItems: 'center',
});

export const itemPrice = style({
  display: "flex",
  gap: '4px',
  alignItems: 'center',
});

export const itemDeliveryInfo = style({
  display: 'flex',
});

export const infoTitle = style({
  width: '76px',
});

export const infoContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const itemDeliveryDescription = style({
  display: 'flex',
  gap: '4px',
});