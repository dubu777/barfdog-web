import { style } from "@vanilla-extract/css";

export const reviewList = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const reviewItem = style({
  width: '100%',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const reviewDefaultInfo = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
});

export const reviewUserName = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const reviewContentsInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const reviewContents = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});