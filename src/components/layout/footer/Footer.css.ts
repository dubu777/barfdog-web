import { style } from '@vanilla-extract/css';

export const footerContainer = style({
  width: '100%',
  minWidth: '320px',
  maxWidth: '600px',
  margin: '0 auto',
  height: '70px',
  zIndex: 20,
  backgroundColor: 'blue', // 레이아웃 확인용 임시 색상
});