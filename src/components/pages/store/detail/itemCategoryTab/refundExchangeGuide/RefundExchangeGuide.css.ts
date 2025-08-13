import { style } from "@vanilla-extract/css";

export const infoContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  padding: '20px 20px 40px',
});

export const infoSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
});

export const infoSectionItem = style({
  display: 'flex',
  alignItems: 'center',
});

export const infoSectionLabel = style({
  minWidth: '100px'
});