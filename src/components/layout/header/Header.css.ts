import { style } from '@vanilla-extract/css';

export const headerContainer = style({
  width: '100%',
  minWidth: '320px',
  maxWidth: '600px',
  margin: '0 auto',
  height: '70px',
  backgroundColor: 'black', // 레이아웃 확인용 임시 색상
  zIndex: 20,
});