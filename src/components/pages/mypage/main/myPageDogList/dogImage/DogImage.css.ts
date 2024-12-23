import {style} from "@vanilla-extract/css";

export const dogImage = style({
  width: '67px',
  height: '67px',
  objectFit: 'cover',
  cursor: 'pointer',
});

export const editImageContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
});