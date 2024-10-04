import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('body',  {
  margin: 0,
  padding: 0,
  width: '100%',
});
