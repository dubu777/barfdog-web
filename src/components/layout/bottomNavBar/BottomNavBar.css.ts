import { style } from '@vanilla-extract/css';


export const bottomNavBarContainer = style({
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  width: '100%',
  minWidth: '320px',
  maxWidth: '600px',
  margin: '0 auto',
  height: '66px',
  backgroundColor: 'black', // 레이아웃 확인용 임시 색상
  zIndex: 20,
});
