import { themeVars } from "@/styles/theme.css";
import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
});

globalStyle('.swiper-pagination-bullet', {
  border: `1px solid ${themeVars.colors.red.red}`,
  background: `${themeVars.colors.gray.gray0} !important`,
  opacity: '1 !important',
})

globalStyle('.swiper-pagination-bullet-active', {
  background: `${themeVars.colors.red.red} !important`,
})

globalStyle('.swiper-button-prev, .swiper-button-next', {
  color: `${themeVars.colors.gray.gray0} !important`,
})

globalStyle('.swiper-button-next:after, .swiper-button-prev:after', {
  fontSize: '30px !important',
})